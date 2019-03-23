using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api.zamanimyok.com.Abstract.Core
{
    public abstract class CoreFeedbackAgent<MaterialType, ResultType> where MaterialType : CoreMaterial where ResultType : CoreResult
    {
        public MaterialType Material { get; set; }
        protected ResultType Result { get; set; }

        public Action<ResultType> OnFinish { get; set; }
        public Action<Exception> OnFail { get; set; }

        protected void Perform()
        {
            try
            {
                Result = (ResultType)Activator.CreateInstance(typeof(ResultType));

                Job();

                if (OnFinish != null) OnFinish(Result);
            }
            catch (Exception ex)
            {
                if (OnFail != null) OnFail(ex);
            }
            finally
            {
                Dispose();
            }
        }

        protected abstract void Job();

        protected void Dispose()
        {
            Material = default(MaterialType);
            Result = default(ResultType);

            OnFinish = null;
            OnFail = null;

            GC.SuppressFinalize(this);
            GC.Collect();
        }
    }
}