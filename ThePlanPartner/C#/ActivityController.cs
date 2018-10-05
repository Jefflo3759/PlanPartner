using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Net;
using System.Net.Http;
using Activity.Services;
using Activity.Models.Domain;
using Activity.Models.Requests;
using Activity.Models.Responses;
using Activity.Services.Security;

namespace Activity.Web.Controllers.Api
{
    [RoutePrefix("api/Activity")]
    public class ActivityController : ApiController
    {
        readonly ActivityService ActivityService;

        public ActivityController(ActivityService ActivityService)
        {
            this.ActivityService = ActivityService;
        }

        [HttpGet, Route("{id:int}")]
        public HttpResponseMessage GetById(int id)
        {
            Activity activity = ActivityService.getbyid(id);
            if (activity == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            else
            {
                ItemResponse<Activity> response = new ItemResponse<Activity>();
                response.Item = activity;
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
        }
        [HttpGet, Route("Active")]
        public HttpResponseMessage GetActiveActivity()
        {
            int userId = (int)User.Identity.GetId().Value;
            Activity activity = ActivityService.GetActiveActivity(userId);
            if (activity == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            else
            {
                ItemResponse<Activity> response = new ItemResponse<Activity>();
                response.Item = activity;
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
        }
        [HttpGet, Route("All")]
        public HttpResponseMessage GetAllActivity(int pageIndex, int pageSize)
        {
            int userId = (int)User.Identity.GetId().Value;
            List<Activity> activitys = ActivityService.GetAllActivity(userId, pageIndex,pageSize);
            ItemsResponse<Activity> response = new ItemsResponse<Activity>();
            response.Items = activitys;

            return Request.CreateResponse(HttpStatusCode.OK, response);

        }

        //[HttpGet, Route("UserData")]
        //public HttpResponseMessage GetAllActivityById(int pageIndex, int pageSize)
        //{
        //    int userId = (int)User.Identity.GetId().Value;
        //    List<Activity> activitys = ActivityService.GetAllActivityByUserId(userId, pageIndex, pageSize);
        //    ItemsResponse<Activity> response = new ItemsResponse<Activity>();
        //    response.Items = activitys;

        //    return Request.CreateResponse(HttpStatusCode.OK, response);

        //}
        [HttpGet, Route("Monthly")]
        public HttpResponseMessage SelectMonthlyList(int pageIndex, int pageSize)
        {
            int userId = (int)User.Identity.GetId().Value;
            List<Activity> activitys = ActivityService.SelectMonthlyList(userId, pageIndex, pageSize);
            ItemsResponse<Activity> response = new ItemsResponse<Activity>();
            response.Items = activitys;

            return Request.CreateResponse(HttpStatusCode.OK, response);

        }
        [HttpGet, Route("Weekly")]
        public HttpResponseMessage SelectWeeklyList(int pageIndex, int pageSize)
        {
            int userId = (int)User.Identity.GetId().Value;
            List<Activity> activitys = ActivityService.SelectWeeklyList(userId, pageIndex, pageSize);
            ItemsResponse<Activity> response = new ItemsResponse<Activity>();
            response.Items = activitys;

            return Request.CreateResponse(HttpStatusCode.OK, response);

        }
        [HttpGet, Route("WeeklyGraph")]
        public HttpResponseMessage SelectWeeklyGraphList()
        {
            int userId = (int)User.Identity.GetId().Value;
            List<Activity> activitys = ActivityService.SelectWeeklyGraphList(userId);
            ItemsResponse<Activity> response = new ItemsResponse<Activity>();
            response.Items = activitys;

            return Request.CreateResponse(HttpStatusCode.OK, response);

        }
        [HttpGet, Route("AllGraph")]
        public HttpResponseMessage SelectAllGraphList()
        {
            int userId = (int)User.Identity.GetId().Value;
            List<Activity> activitys = ActivityService.SelectAllGraphList(userId);
            ItemsResponse<Activity> response = new ItemsResponse<Activity>();
            response.Items = activitys;

            return Request.CreateResponse(HttpStatusCode.OK, response);

        }
        [HttpGet, Route("BiWeekly")]
        public HttpResponseMessage SelectBiWeeklyList(int pageIndex, int pageSize)
        {
            int userId = (int)User.Identity.GetId().Value;
            List<Activity> activitys = ActivityService.SelectBiWeeklyList(userId, pageIndex, pageSize);
            ItemsResponse<Activity> response = new ItemsResponse<Activity>();
            response.Items = activitys;

            return Request.CreateResponse(HttpStatusCode.OK, response);

        }
        [HttpGet, Route("Yesterday")]
        public HttpResponseMessage SelectYesterdayList(int pageIndex, int pageSize)
        {
            int userId = (int)User.Identity.GetId().Value;
            List<Activity> activitys = ActivityService.SelectYesterdayList(userId, pageIndex, pageSize);
            ItemsResponse<Activity> response = new ItemsResponse<Activity>();
            response.Items = activitys;

            return Request.CreateResponse(HttpStatusCode.OK, response);

        }
        [HttpGet, Route("Today")]
        public HttpResponseMessage SelectTodayList(int pageIndex, int pageSize)
        {
            int userId = (int)User.Identity.GetId().Value;
            List<Activity> activitys = ActivityService.SelectTodayList(userId, pageIndex, pageSize);
            ItemsResponse<Activity> response = new ItemsResponse<Activity>();
            response.Items = activitys;

            return Request.CreateResponse(HttpStatusCode.OK, response);

        }
        [Route, HttpPost]
        public HttpResponseMessage Create(ActivityCreateRequest ActivityCreateRequest)
        {
            int userId = (int)User.Identity.GetId().Value;
            if (ActivityCreateRequest == null)
            {
                ModelState.AddModelError("", "missing body data");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            int newActivityId = ActivityService.Create(ActivityCreateRequest, userId);

            return Request.CreateResponse(HttpStatusCode.Created, new ItemResponse<int> { Item = newActivityId });
        }
        [HttpPut, Route("{id:int}")]
        public HttpResponseMessage Update(int id, ActivityUpdateRequest ActivityUpdateRequest)
        {
            int userId = (int)User.Identity.GetId().Value;
            if (ActivityUpdateRequest == null)
            {
                ModelState.AddModelError("", "missing body data");

            }
            else if (id != ActivityUpdateRequest.Id)
            {
                ModelState.AddModelError("id", " id in the URL doesn't match the Id in the body");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            ActivityService.Update(ActivityUpdateRequest, userId);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpDelete, Route("{id:int}")]
        public HttpResponseMessage Delete(int id)
        {
            ActivityService.Delete(id);
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}