using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace TouristClubApi.Data.Models
{
    [Table("Departments")]
    public class Department
    {
        public int Id { get; set; }
        public string DepartmentName { get; set; }
        public string Description { get; set; }
        public int AddressId { get; set; }
        public int ScheduleId { get; set; }

        public virtual ICollection<User> Doctors { get; set; }
    }
}