using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    // Define a class for handling activity details
    public class Details
    {
        // Define a query class to request activity details
        public class Query : IRequest<Result<Activity>>
        {
            // Specify the ID of the activity to retrieve
            public Guid Id { get; set; }
        }

        // Define a handler class to handle the activity details query
        public class Handler : IRequestHandler<Query, Result<Activity>>
        {
            private readonly DataContext _context;

            // Constructor to inject the data context
            public Handler(DataContext context)
            {
                _context = context;
            }

            // Method to handle the activity details query
            public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                // Retrieve the activity from the database asynchronously using the provided ID
                var activity = await _context.Activities.FindAsync(request.Id);

                // Return a Result object indicating the success of the operation and containing the retrieved activity
                return Result<Activity>.Success(activity);
            }
        }
    }
}
