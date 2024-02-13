using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; } //Getting all the params which are needed to create an activity
        }
        public class Handler : IRequestHandler<Command>
        {
        private readonly DataContext _context; //private variable to access the DBContext
            public Handler(DataContext context) 
            {
                 _context = context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity); //we are adding the newly created activity to the table .

                await _context.SaveChangesAsync();
            }
        }
    }
}