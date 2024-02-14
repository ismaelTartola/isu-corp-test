using backend.DTO.Response;
using backend.Responses;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace backend.Controllers;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private static readonly List<User> _users = new()
    {
        new User { Id = 1, Name = "Jhon Doe" },
        new User { Id = 2, Name = "Jane Doe" }
    };

    [HttpGet]
    [ProducesResponseType(typeof(List<UserResponse>), (int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(ApiResponse), (int)HttpStatusCode.BadRequest)]
    public IActionResult GetUsers()
    {
        //just adding delay to simulate real life
        Thread.Sleep(2000);
        return Ok(new ApiOkResponse(_users));
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(UserResponse), (int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(ApiResponse), (int)HttpStatusCode.BadRequest)]
    public async Task<IActionResult> GetUser(int id)
    {
        //just adding delay to simulate real life
        Thread.Sleep(2000);

        var user = _users.FirstOrDefault(u => u.Id == id);
        if (user is null)
        {
            return BadRequest();
        }
        return Ok(new ApiOkResponse(user));
    }
}