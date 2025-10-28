using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using Windows.Foundation.Metadata;

#if !NETSTANDARD2_0
using System.Runtime.InteropServices.WindowsRuntime;
#else
using ReadOnlyArray = Monaco.Helpers.Stubs.ReadOnlyArrayAttribute;
#endif

namespace Monaco
{
    public sealed class IMarkdownString(string? svalue, bool isTrusted)
    {
        [JsonProperty("isTrusted")]
        public bool IsTrusted { get; set; } = isTrusted;
        [JsonProperty("supportThemeIcons", NullValueHandling =NullValueHandling.Ignore)]
        public bool? SupportThemeIcons { get; set; }

        [JsonProperty("uris", NullValueHandling = NullValueHandling.Ignore)]
        public IDictionary<string, Uri>? Uris { get; set; }

        [JsonProperty("value")]
        public string? Value { get; set; } = svalue;

        public IMarkdownString(string? svalue) : this(svalue, false) { }
    }

    public static class MarkdownStringExtensions
    {
        [DefaultOverload]
        public static IMarkdownString ToMarkdownString(this string svalue)
        {
            return ToMarkdownString(svalue, false);
        }

        [DefaultOverload]
        public static IMarkdownString ToMarkdownString(this string svalue, bool isTrusted)
        {
            return new IMarkdownString(svalue, isTrusted);
        }

        public static IMarkdownString[] ToMarkdownString(this string[] values)
        {
            return ToMarkdownString(values, false);
        }

        public static IMarkdownString[] ToMarkdownString(this string[] values, bool isTrusted)
        {
            return [.. values.Select(value => new IMarkdownString(value, isTrusted))];
        }
    }
}
