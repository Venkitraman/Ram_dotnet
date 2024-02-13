using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController :ControllerBase
    {
        private IMediator _mediator;
        //We have created a Private mediator and ve populated to the Mediator service
        //Controller cannot access the dbcontext directly so we use mediatr ,cqrs pattern and to send request to application to application 
        protected IMediator Mediator => _mediator ??= 
            HttpContext.RequestServices.GetService<IMediator>();

    }
}