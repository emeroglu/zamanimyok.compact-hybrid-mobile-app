using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api.zamanimyok.com.Abstract.Core
{
    public abstract class CoreAgent<MaterialType> where MaterialType : CoreMaterial
    {
        public MaterialType Material { get; set; }

        public Action OnFinish { get; set; }
        public Action<Exception> OnFail { get; set; }

        protected void Perform()
        {
            try
            {
                Job();

                if (OnFinish != null) OnFinish();
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

            OnFinish = null;
            OnFail = null;

            GC.SuppressFinalize(this);
            GC.Collect();
        }
    }
}