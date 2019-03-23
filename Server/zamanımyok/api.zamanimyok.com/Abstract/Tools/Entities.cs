using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using api.zamanimyok.com.Models;

namespace api.zamanimyok.com.Abstract.Tools
{
#if DEBUG
    public class Entities: Entities_Dev
    {
    }
#endif

#if DEV
    public class Entities: Entities_Dev
    {
    }
#endif

#if TEST
    public class Entities: Entities_Test
    {
    }
#endif
}