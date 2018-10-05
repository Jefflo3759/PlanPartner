using Activity.Data.Providers;
using Activity.Models.Domain;
using Activity.Models.Requests;
using System;
using System.Collections.Generic;
using System.Data;
using Activity.Data;

namespace Activity.Services
{
    public class ActivityService
    {
        readonly IDataProvider dataProvider;

        public ActivityService(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }

        public List<Activity> GetAllActivity(int userId, int pageIndex , int pageSize)
        {
            List<Activity> listOfActivitys = new List<Activity>();

            dataProvider.ExecuteCmd(
                "Activity_SelectAll", (parameters) =>
                {
                    parameters.AddWithValue("@UserId", userId);
                    parameters.AddWithValue("@pageIndex", pageIndex);
                    parameters.AddWithValue("@pageSize", pageSize);
                },
                (reader, resultSetIndex) =>
                {
                    Activity Activity = new Activity
                    {
                        Id = (int)reader["Id"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        DateModified = (DateTime)reader["DateModified"],
                        UserId = (int)reader["UserId"],
                        Contacts = (int)reader["Contacts"],
                        Leads = (int)reader["Leads"],
                        ActivityTypeId = (int)reader["ActivityTypeId"],
                        Appointments = (int)reader["Appointments"],
                        StartTime = reader.GetSafeDateTimeNullable("StartTime"),
                        EndTime = reader.GetSafeDateTimeNullable("EndTime"),
                        ActivityType = (string)reader["ActivityType"],
                        TotalRows = (int)reader["TotalRows"],
                        TotalContacts = (int)reader["TotalContacts"],
                        TotalLeads = (int)reader["TotalLeads"],
                        TotalAppointments = (int)reader["TotalAppointments"],
                        TimeDifference = reader.GetSafeInt32Nullable("TimeDifference"),
                        TotalMinutes = reader.GetSafeInt32Nullable("TotalMinutes")

          

                    };
                    listOfActivitys.Add(Activity);

                });
            return listOfActivitys;
        }
        
            public List<Activity> SelectMonthlyList(int userId, int pageIndex, int pageSize)
        {
            List<Activity> listOfActivitys = new List<Activity>();

            dataProvider.ExecuteCmd(
                "Activity_SelectMonthlyList", (parameters) =>
                {
                    parameters.AddWithValue("@UserId", userId);
                    parameters.AddWithValue("@pageIndex", pageIndex);
                    parameters.AddWithValue("@pageSize", pageSize);
                },
                (reader, resultSetIndex) =>
                {
                    Activity Activity = new Activity
                    {
                        Id = (int)reader["Id"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        DateModified = (DateTime)reader["DateModified"],
                        UserId = (int)reader["UserId"],
                        ActivityType = (string)reader["ActivityType"],
                        Contacts = (int)reader["Contacts"],
                        Leads = (int)reader["Leads"],
                        ActivityTypeId = (int)reader["ActivityTypeId"],
                        Appointments = (int)reader["Appointments"],
                        StartTime = (DateTime)reader["StartTime"],
                        EndTime = reader.GetSafeDateTimeNullable("EndTime"),
                        TotalRows = (int)reader["TotalRows"],
                        TotalContacts = (int)reader["TotalContacts"],
                        TotalLeads = (int)reader["TotalLeads"],
                        TotalAppointments = (int)reader["TotalAppointments"],
                        TimeDifference = reader.GetSafeInt32Nullable("TimeDifference"),
                        TotalMinutes = reader.GetSafeInt32Nullable("TotalMinutes")



                    };
                    listOfActivitys.Add(Activity);

                });
            return listOfActivitys;
        }

        public List<Activity> SelectWeeklyList(int userId, int pageIndex, int pageSize)
        {
            List<Activity> listOfActivitys = new List<Activity>();

            dataProvider.ExecuteCmd(
                "Activity_SelectWeeklyList", (parameters) =>
                {
                    parameters.AddWithValue("@UserId", userId);
                    parameters.AddWithValue("@pageIndex", pageIndex);
                    parameters.AddWithValue("@pageSize", pageSize);
                },
                (reader, resultSetIndex) =>
                {
         
                            Activity Activity = new Activity
                            {
                                Id = (int)reader["Id"],
                                DateCreated = (DateTime)reader["DateCreated"],
                                DateModified = (DateTime)reader["DateModified"],
                                UserId = (int)reader["UserId"],
                                ActivityType = (string)reader["ActivityType"],
                                Contacts = (int)reader["Contacts"],
                                Leads = (int)reader["Leads"],
                                ActivityTypeId = (int)reader["ActivityTypeId"],
                                Appointments = (int)reader["Appointments"],
                                StartTime = (DateTime)reader["StartTime"],
                                EndTime = reader.GetSafeDateTimeNullable("EndTime"),
                                TotalRows = (int)reader["TotalRows"],
                                TotalContacts = (int)reader["TotalContacts"],
                                TotalLeads = (int)reader["TotalLeads"],
                                TotalAppointments = (int)reader["TotalAppointments"],
                                TimeDifference = reader.GetSafeInt32Nullable("TimeDifference"),
                                TotalMinutes = reader.GetSafeInt32Nullable("TotalMinutes")



                            };
                            listOfActivitys.Add(Activity);
           
                    

                });
            return listOfActivitys;
        }
        public List<Activity> SelectWeeklyGraphList(int userId)
        {
            List<Activity> listOfActivitys = new List<Activity>();

            dataProvider.ExecuteCmd(
                "Activity_SelectWeeklyGraphList", (parameters) =>
                {
                    parameters.AddWithValue("@UserId", userId);
                },
                (reader, resultSetIndex) =>
                {
                  
                            Activity Activity = new Activity
                            {
                                
                                Date = (DateTime)reader["Date"],
                                DayContacts = (int)reader["DayContacts"],
                                DayLeads = (int)reader["DayLeads"],
                                DayAppointments = (int)reader["DayAppointments"],
                                Name = (string)reader["Name"],
                                TotalMinutes = reader.GetSafeInt32Nullable("TotalMinutes")


                            };
                            listOfActivitys.Add(Activity);

                    


                });
            return listOfActivitys;
        }

        public List<Activity> SelectAllGraphList(int userId)
        {
            List<Activity> listOfActivitys = new List<Activity>();

            dataProvider.ExecuteCmd(
                "Activity_SelectAllGraphList", (parameters) =>
                {
                    parameters.AddWithValue("@UserId", userId);
                },
                (reader, resultSetIndex) =>
                {

                    Activity Activity = new Activity
                    {

                        Date = (DateTime)reader["Date"],
                        DayContacts = (int)reader["DayContacts"],
                        DayLeads = (int)reader["DayLeads"],
                        DayAppointments = (int)reader["DayAppointments"],
                        Name = (string)reader["Name"],
                        TotalMinutes = reader.GetSafeInt32Nullable("TotalMinutes")


                    };
                    listOfActivitys.Add(Activity);




                });
            return listOfActivitys;
        }



        public List<Activity> SelectBiWeeklyList(int userId, int pageIndex, int pageSize)
        {
            List<Activity> listOfActivitys = new List<Activity>();

            dataProvider.ExecuteCmd(
                "Activity_SelectBiWeeklyList", (parameters) =>
                {
                    parameters.AddWithValue("@UserId", userId);
                    parameters.AddWithValue("@pageIndex", pageIndex);
                    parameters.AddWithValue("@pageSize", pageSize);
                },
                (reader, resultSetIndex) =>
                {
                    Activity Activity = new Activity
                    {
                        Id = (int)reader["Id"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        DateModified = (DateTime)reader["DateModified"],
                        UserId = (int)reader["UserId"],
                        ActivityType = (string)reader["ActivityType"],
                        Contacts = (int)reader["Contacts"],
                        Leads = (int)reader["Leads"],
                        ActivityTypeId = (int)reader["ActivityTypeId"],
                        Appointments = (int)reader["Appointments"],
                        StartTime = (DateTime)reader["StartTime"],
                        EndTime = reader.GetSafeDateTimeNullable("EndTime"),
                        TotalRows = (int)reader["TotalRows"],
                        TotalContacts = (int)reader["TotalContacts"],
                        TotalLeads = (int)reader["TotalLeads"],
                        TotalAppointments = (int)reader["TotalAppointments"],
                        TimeDifference = reader.GetSafeInt32Nullable("TimeDifference"),
                        TotalMinutes = reader.GetSafeInt32Nullable("TotalMinutes")



                    };
                    listOfActivitys.Add(Activity);

                });
            return listOfActivitys;
        }

        public List<Activity> SelectYesterdayList(int userId, int pageIndex, int pageSize)
        {
            List<Activity> listOfActivitys = new List<Activity>();

            dataProvider.ExecuteCmd(
                "Activity_SelectYesterdayList", (parameters) =>
                {
                    parameters.AddWithValue("@UserId", userId);
                    parameters.AddWithValue("@pageIndex", pageIndex);
                    parameters.AddWithValue("@pageSize", pageSize);
                },
                (reader, resultSetIndex) =>
                {
                    Activity Activity = new Activity
                    {
                        Id = (int)reader["Id"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        DateModified = (DateTime)reader["DateModified"],
                        UserId = (int)reader["UserId"],
                        ActivityType = (string)reader["ActivityType"],
                        Contacts = (int)reader["Contacts"],
                        Leads = (int)reader["Leads"],
                        ActivityTypeId = (int)reader["ActivityTypeId"],
                        Appointments = (int)reader["Appointments"],
                        StartTime = (DateTime)reader["StartTime"],
                        EndTime = reader.GetSafeDateTimeNullable("EndTime"),
                        TotalRows = (int)reader["TotalRows"],
                        TotalContacts = (int)reader["TotalContacts"],
                        TotalLeads = (int)reader["TotalLeads"],
                        TotalAppointments = (int)reader["TotalAppointments"],
                        TimeDifference = reader.GetSafeInt32Nullable("TimeDifference"),
                        TotalMinutes = reader.GetSafeInt32Nullable("TotalMinutes")



                    };
                    listOfActivitys.Add(Activity);

                });
            return listOfActivitys;
        }
        public List<Activity> SelectTodayList(int userId, int pageIndex, int pageSize)
        {
            List<Activity> listOfActivitys = new List<Activity>();

            dataProvider.ExecuteCmd(
                "Activity_SelectTodayList", (parameters) =>
                {
                    parameters.AddWithValue("@UserId", userId);
                    parameters.AddWithValue("@pageIndex", pageIndex);
                    parameters.AddWithValue("@pageSize", pageSize);
                },
                (reader, resultSetIndex) =>
                {
                    Activity Activity = new Activity
                    {
                        Id = (int)reader["Id"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        DateModified = (DateTime)reader["DateModified"],
                        UserId = (int)reader["UserId"],
                        ActivityType = (string)reader["ActivityType"],
                        Contacts = (int)reader["Contacts"],
                        Leads = (int)reader["Leads"],
                        ActivityTypeId = (int)reader["ActivityTypeId"],
                        Appointments = (int)reader["Appointments"],
                        StartTime = (DateTime)reader["StartTime"],
                        EndTime = reader.GetSafeDateTimeNullable("EndTime"),
                        TotalRows = (int)reader["TotalRows"],
                        TotalContacts = (int)reader["TotalContacts"],
                        TotalLeads = (int)reader["TotalLeads"],
                        TotalAppointments = (int)reader["TotalAppointments"],
                        TimeDifference = reader.GetSafeInt32Nullable("TimeDifference"),
                        TotalMinutes = reader.GetSafeInt32Nullable("TotalMinutes")



                    };
                    listOfActivitys.Add(Activity);

                });
            return listOfActivitys;
        }
        //public List<Activity> GetAllActivityByUserId(int userId, int pageIndex, int pageSize)
        //{
        //    List<Activity> listOfActivitys = new List<Activity>();

        //    dataProvider.ExecuteCmd(
        //        "Activity_SelectAllByUserId", (parameters) =>
        //        {
        //            parameters.AddWithValue("@UserId", userId);
        //            parameters.AddWithValue("@pageIndex", pageIndex);
        //            parameters.AddWithValue("@pageSize", pageSize);
        //        },
        //        (reader, resultSetIndex) =>
        //        {
        //            Activity Activity = new Activity
        //            {
        //                Id = (int)reader["Id"],
        //                DateCreated = (DateTime)reader["DateCreated"],
        //                DateModified = (DateTime)reader["DateModified"],
        //                UserId = (int)reader["UserId"],
        //                ActivityType = (string)reader["ActivityType"],
        //                Contacts = (int)reader["Contacts"],
        //                Leads = (int)reader["Leads"],
        //                ActivityTypeId = (int)reader["ActivityTypeId"],
        //                Appointments = (int)reader["Appointments"],
        //                StartTime = (DateTime)reader["StartTime"],
        //                EndTime = (DateTime)reader["EndTime"],
        //                TotalRows = (int)reader["TotalRows"],
        //                TotalContacts = (int)reader["TotalContacts"]

        //            };
        //            listOfActivitys.Add(Activity);

        //        });
        //    return listOfActivitys;
        //}

        public Activity getbyid(int id)
        {
            Activity Activity = null;
            dataProvider.ExecuteCmd(
                "Activity_SelectById", (parameters) =>
                {
                    parameters.AddWithValue("@Id", id);
                },
                singleRecordMapper: (reader, resultsetindex) =>
                {
                    Activity = new Activity
                    {
                        Id = (int)reader["Id"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        DateModified = (DateTime)reader["DateModified"],
                        UserId = (int)reader["UserId"],
                        ActivityType = (string)reader["ActivityType"],
                        Contacts = (int)reader["Contacts"],
                        Leads = (int)reader["Leads"],
                        ActivityTypeId = (int)reader["ActivityTypeId"],
                        Appointments = (int)reader["Appointments"],
                        StartTime = (DateTime)reader["StartTime"],
                        EndTime = reader.GetSafeDateTimeNullable("EndTime")
                    };

                });
            return Activity;
        }

        public Activity GetActiveActivity(int userId)
        {
            Activity activity = null;
            dataProvider.ExecuteCmd(
                "Activity_GetActiveActivity", (parameters) =>
                {
                    parameters.AddWithValue("@UserId", userId)

                    ;
                },
                singleRecordMapper: (reader, resultSetIndex) =>
                {
                    activity = new Activity
                    {
                        Id = (int)reader["Id"],
                        UserId = (int)reader["UserId"],
                        ActivityTypeId = (int)reader["ActivityTypeId"],
                        Contacts = (int)reader["Contacts"],
                        Leads = (int)reader["Leads"],
                        Appointments = (int)reader["Appointments"],
                        StartTime = (DateTime)reader["StartTime"],
                        EndTime = reader.GetSafeDateTimeNullable("EndTime"),
                        DateCreated = (DateTime)reader["DateCreated"],
                        DateModified = (DateTime)reader["DateModified"]
                    };

                });
            return activity;
        }

        public int Create(ActivityCreateRequest request, int userId)
        {
            int newId = 0;

            dataProvider.ExecuteNonQuery(
                "Activity_Insert",
                (parameters) =>
                {
                    parameters.AddWithValue("@UserId", userId);
                    parameters.AddWithValue("@ActivityTypeId", request.ActivityTypeId);
                    parameters.AddWithValue("@Contacts", request.Contacts);
                    parameters.AddWithValue("@Leads", request.Leads);
                    parameters.AddWithValue("@Appointments", request.Appointments);
                    parameters.AddWithValue("@StartTime", request.StartTime);
                    parameters.AddWithValue("@EndTime", request.EndTime);

                    parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;

                },
            (parameters) =>
            {
                newId = (int)parameters["@Id"].Value;
            });
            return newId;
        }

        public void Update(ActivityUpdateRequest request, int userId)
        {

            dataProvider.ExecuteNonQuery(
                "Activity_Update",
                (parameters) =>
                {
                    parameters.AddWithValue("@UserId", userId);
                    parameters.AddWithValue("@ActivityTypeId", request.ActivityTypeId);
                    parameters.AddWithValue("@Contacts", request.Contacts);
                    parameters.AddWithValue("@Leads", request.Leads);
                    parameters.AddWithValue("@Appointments", request.Appointments);
                    parameters.AddWithValue("@StartTime", request.StartTime);
                    parameters.AddWithValue("@EndTime", request.EndTime ?? (object)DBNull.Value); //if given endtime send it/ else send dbnull value
                    parameters.AddWithValue("@Id", request.Id);
                });
        }

        public void Delete(int id)
        {
            Activity activity = null;
            dataProvider.ExecuteCmd(
                "Activity_Delete", (parameters) =>
                {
                    parameters.AddWithValue("@Id", id);
                },
                singleRecordMapper: (reader, resultSetIndex) =>
                {
                    activity = new Activity
                    {
                        Id = (int)reader["Id"]
                    };
                }
                );
        }
    }
}








