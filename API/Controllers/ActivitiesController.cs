using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {

        [HttpGet]  //api/activities
        public async Task<IActionResult> GetActivities()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        //In CQRS patern the mediatr will consider the get methods as Query and the Post,edit and delete as Command
        [HttpGet("{id}")]  //api/activities/fdefjtrhefhdlk8
        //[Route("GetActive")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
            //return await _context.Activities.FindAsync(id);
            var result = await Mediator.Send(new Details.Query { Id = id });

            return HandleResult(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Activity = activity }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Activity = activity }));
        }

        [HttpDelete("{id}")] //Root parameter

        public async Task<IActionResult> DeleteActivity(Guid id)
        {

            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
            
        }
    }
}
