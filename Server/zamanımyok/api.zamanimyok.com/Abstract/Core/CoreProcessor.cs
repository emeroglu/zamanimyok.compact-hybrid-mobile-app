using api.zamanimyok.com.Abstract.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api.zamanimyok.com.Abstract.Core
{
    public abstract class CoreProcessor<MaterialType> : CoreAgent<MaterialType> where MaterialType : CoreMaterial
    {
        protected List<Task> listTasks { get; set; }

        protected abstract List<Task> Tasks();
        protected abstract bool Condition();
        protected abstract void OnInterruption();        

        protected override void Job()
        {
            listTasks = Tasks();

            TakeAction(0, null);
        }

        protected void TakeAction(int i, object pass)
        {
            if (Condition())
            {
                try
                {
                    if (i != listTasks.Count)
                    {
                        listTasks[i].Action
                        (
                            (task, package) =>
                            {                                
                                string mission = (string)task;

                                Task desiredTask = listTasks.Where(t => t.Mission == mission).FirstOrDefault();

                                if (desiredTask != null)
                                    TakeAction(listTasks.IndexOf(listTasks.Where(t => t.Mission == mission).FirstOrDefault()), package);                                
                            },
                            (package) => { TakeAction(i, package); },
                            (package) => { TakeAction(i + 1, package); },
                            pass
                        );
                    }
                }
                catch (Exception ex)
                {                    
                    throw new Exception(listTasks[i].Mission + " => " + ex.Message);
                }
            }
            else
            {
                OnInterruption();
            }
        }
    }
}