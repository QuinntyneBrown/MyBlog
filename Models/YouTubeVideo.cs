using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.Models
{
    public class YouTubeVideo : Content
    {
        public YouTubeVideo()
        {

        }


        public string VideoId { get; set; }
        public bool AutoPlay { get; set; }
        public bool Html5 { get; set; }
        public string Theme { get; set; }
        public bool ModesBranding { get; set; }
        public string Color { get; set; }
        public IvLoadPolicy IvLoadPolicy { get; set; }
        public bool ShowInfo { get; set; }
        public bool Controls { get; set; }
    }
}