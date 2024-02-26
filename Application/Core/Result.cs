namespace Application.Core
{
   // Define a generic Result class to encapsulate the success or failure of an operation
    public class Result<T>
    {
        // Flag indicating whether the operation was successful
        public bool IsSuccess { get; set; }

        // If the operation is successful, this property holds the result value
        public T Value { get; set; }

        // If the operation fails, this property holds the error message
        public string Error { get; set; }

        // Method to create a successful Result object with a specified value
        public static Result<T> Success(T value) => new Result<T> { IsSuccess = true, Value = value };

        // Method to create a failed Result object with a specified error message
        public static Result<T> Failure(string error) => new Result<T> { IsSuccess = false, Error = error };
    }
}