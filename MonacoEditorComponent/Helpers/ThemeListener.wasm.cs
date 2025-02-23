using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices.JavaScript;
using System.Text;
using Uno;
using Uno.Foundation;

namespace Monaco.Helpers
{
	partial class ThemeListener
	{
        private static ConditionalWeakTable<object, ThemeListener> _instances = new();
        
        partial void PartialCtor()
		{
            _instances.Add(_owner, this);
		}

        [JSExport]
        public static string ManagedGetCurrentThemeName([JSMarshalAs<JSType.Any>] object managedOwner)
        {
            if (_instances.TryGetValue(managedOwner, out var logger))
            {
                return logger.CurrentThemeName;
            }
            else
            {
                throw new InvalidOperationException($"ThemeListener not found for owner {managedOwner}");
            }
        }

        [JSExport]
        public static bool ManagedGetIsHighContrast([JSMarshalAs<JSType.Any>] object managedOwner)
        {
            if (_instances.TryGetValue(managedOwner, out var logger))
            {
                return logger.IsHighContrast;
            }
            else
            {
                throw new InvalidOperationException($"ThemeListener not found for owner {managedOwner}");
            }
        }
    }
}
