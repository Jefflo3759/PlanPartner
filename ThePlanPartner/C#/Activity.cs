using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Activity.Models.Domain
{
    public class Activity
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? ActivityTypeId  { get; set; }
        public string ActivityType { get; set; }
        public int Contacts { get; set; }
        public int Leads { get; set; }
        public int Appointments { get; set; }
        public int TotalRows { get; set; }
        public int TotalContacts { get; set; }
        public int TotalLeads { get; set; }
        public int TotalAppointments { get; set; }
        public int ?TimeDifference { get; set; }
        public int ?TotalMinutes { get; set; }
        public DateTime Date { get; set; }
        public int Activities { get; set; }
        public int DayContacts { get; set; }
        public int DayLeads { get; set; }
        public int DayAppointments { get; set;
        }
        public string Name { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
