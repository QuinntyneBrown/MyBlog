using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.Models
{
    public class TrainingPlan: BaseEntity
    {
        public TrainingPlan()
        {
            this.Courses = new HashSet<Course>();
        }

        public string Name { get; set; }
        public string Slug { get; set; }
        public virtual ICollection<Course> Courses { get; set; }
    }
}