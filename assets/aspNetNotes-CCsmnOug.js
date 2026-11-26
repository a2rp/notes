import{Bt as e,Ft as t,It as n,Pt as r,Rt as i,Ut as a,c as o,d as s,s as c,y as l,zt as u}from"./index-COQIkgJQ.js";import{n as d,t as f}from"./lib-D-bAJtt-.js";var p=a(e(),1),m=Object.entries(Object.assign({"./chapters/01-aspnet-core-and-http.md":`[Back to notes index](../README.md)\r
\r
| Previous: Index | [Notes index](../README.md) | [Next: .NET setup and project structure](02-dotnet-setup-and-project-structure.md) |\r
| --- | --- | --- |\r
\r
# 1. ASP.NET Core and HTTP basics\r
\r
## What ASP.NET Core does\r
\r
ASP.NET Core is the web framework in .NET for receiving HTTP requests and producing HTTP responses. The web server accepts a connection, the framework builds an HttpContext, and the configured application pipeline decides what the request means.\r
\r
A useful first model is:\r
\r
1. A client sends a request with a method, path, headers, and optionally a body.\r
2. The server accepts the request and creates an HttpContext.\r
3. Middleware can inspect or change the request, call the next middleware, and inspect the response.\r
4. An endpoint handles the request and returns a result.\r
5. The response travels back through the pipeline to the client.\r
\r
ASP.NET Core includes the server, routing, dependency injection, configuration, logging, and several ways to build web interfaces and APIs. Kestrel is the built-in cross-platform HTTP server. In production, a reverse proxy or a managed host may sit in front of it.\r
\r
## HTTP request and response parts\r
\r
A request has a method such as GET or POST, a path such as /api/reading-items, headers such as Accept, and sometimes a body. A response has a status code, headers, and optionally a body.\r
\r
Common method intent:\r
\r
- GET reads a representation and should not change server state.\r
- POST submits data or asks the server to create a resource.\r
- PUT replaces a resource at a known address.\r
- PATCH changes part of a resource.\r
- DELETE asks the server to remove a resource.\r
\r
Common status codes include 200 OK for a successful read, 201 Created for a new resource, 204 No Content for success without a response body, 400 Bad Request for invalid input, 401 Unauthorized when authentication is missing, 403 Forbidden when access is denied, 404 Not Found when a resource does not exist, and 500 Internal Server Error for an unexpected server failure.\r
\r
Do not trust values just because they came from a browser. Validate request data on the server and make authorization decisions on the server.\r
\r
## The smallest useful app\r
\r
The modern hosting model puts setup and endpoint mapping in Program.cs:\r
\r
\`\`\`csharp\r
var builder = WebApplication.CreateBuilder(args);\r
var app = builder.Build();\r
\r
app.MapGet("/", () => Results.Text("Reading list service"));\r
app.MapGet("/health", () => Results.Ok(new { status = "healthy" }));\r
\r
app.Run();\r
\`\`\`\r
\r
Run it from the project directory with dotnet run. The console prints a local address. A request to / receives a 200 response with plain text. The /health endpoint returns JSON because the result is an object.\r
\r
A request can be checked from a terminal:\r
\r
\`\`\`bash\r
curl -i https://localhost:5001/health\r
\`\`\`\r
\r
Use the address printed by dotnet run. The port can differ between machines and projects.\r
\r
## Where each concern belongs\r
\r
Endpoints describe what a path does. Middleware handles cross-cutting request work such as exception handling, HTTPS redirection, authentication, and static files. Services hold reusable application behavior. Configuration supplies environment-specific settings. Keeping these responsibilities separate makes it easier to test and change the app.\r
\r
ASP.NET Core does not require one UI style. Minimal APIs are concise endpoint definitions. Controllers organize HTTP APIs with attributes and action methods. Razor Pages and MVC render HTML on the server. Blazor builds interactive web interfaces with .NET.\r
\r
## Common mistakes\r
\r
- Returning a successful status for an operation that failed.\r
- Putting database work directly into every endpoint.\r
- Exposing exception details to public clients.\r
- Treating 401 and 403 as interchangeable.\r
- Assuming an HTTP request body is valid or safe.\r
\r
## Practice check\r
\r
Start a new web project, run it, and inspect the response headers with curl -i. Change /health to return a different status and JSON value. Notice that the method, path, status, and response body are separate parts of HTTP.\r
\r
## References\r
\r
- [ASP.NET Core overview](https://learn.microsoft.com/aspnet/core/overview?view=aspnetcore-10.0)\r
- [HTTP overview](https://learn.microsoft.com/aspnet/core/fundamentals/?view=aspnetcore-10.0)\r
- [.NET support policy](https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core)\r
`,"./chapters/02-dotnet-setup-and-project-structure.md":`[Back to notes index](../README.md)\r
\r
| [Previous: ASP.NET Core and HTTP basics](01-aspnet-core-and-http.md) | [Notes index](../README.md) | [Next: Hosting, environments, and configuration](03-hosting-environments-and-configuration.md) |\r
| --- | --- | --- |\r
\r
# 2. .NET setup and project structure\r
\r
## SDK, runtime, and target framework\r
\r
The .NET SDK is the development toolset. It includes the command line, compiler, templates, and build tools. The runtime executes applications. Install the SDK that matches the framework you plan to target, then check what the machine can use:\r
\r
\`\`\`bash\r
dotnet --info\r
dotnet --list-sdks\r
dotnet --list-runtimes\r
\`\`\`\r
\r
This notes collection uses .NET 10 and C#. The target framework is written in the project file as net10.0. Keep the SDK and runtime patched. The framework version does not pin a particular monthly patch.\r
\r
## Create a project\r
\r
For a small HTTP API based on Minimal APIs:\r
\r
\`\`\`bash\r
dotnet new webapi -n ReadingList.Api\r
cd ReadingList.Api\r
dotnet run\r
\`\`\`\r
\r
The default Web API template uses Minimal APIs. To start with controllers, pass the controller option:\r
\r
\`\`\`bash\r
dotnet new webapi --use-controllers -n ReadingList.Api\r
\`\`\`\r
\r
For server-rendered pages, the built-in templates include Razor Pages and Blazor:\r
\r
\`\`\`bash\r
dotnet new webapp -n ReadingList.Web\r
dotnet new blazor -n ReadingList.Blazor\r
\`\`\`\r
\r
Templates can change between SDK releases. Use dotnet new list to inspect the templates installed with the SDK.\r
\r
## Read the project files\r
\r
A typical web project contains:\r
\r
- Program.cs, where the host, services, middleware, and endpoints are configured.\r
- A project file ending in .csproj, which declares the target framework and package references.\r
- appsettings.json, which stores non-secret defaults.\r
- Properties/launchSettings.json, which stores local development launch profiles.\r
- wwwroot, for public static web assets when the application serves them.\r
- bin and obj, generated build output that should not be committed.\r
\r
A minimal project file looks like this:\r
\r
\`\`\`xml\r
<Project Sdk="Microsoft.NET.Sdk.Web">\r
  <PropertyGroup>\r
    <TargetFramework>net10.0</TargetFramework>\r
    <Nullable>enable</Nullable>\r
    <ImplicitUsings>enable</ImplicitUsings>\r
  </PropertyGroup>\r
</Project>\r
\`\`\`\r
\r
Nullable reference types help the compiler identify places where a value may be missing. Treat the warnings as useful questions about the data flow.\r
\r
## Useful CLI commands\r
\r
\`\`\`bash\r
dotnet restore\r
dotnet build\r
dotnet run\r
dotnet watch\r
dotnet test\r
\`\`\`\r
\r
Run commands from the solution or project directory. Use dotnet run --project path/to/ReadingList.Api when the current directory is elsewhere. dotnet watch rebuilds and restarts the app as source files change.\r
\r
For a multi-project solution, create a solution file, add projects, and reference shared code explicitly:\r
\r
\`\`\`bash\r
dotnet new sln -n ReadingList\r
dotnet sln ReadingList.sln add src/ReadingList.Api/ReadingList.Api.csproj\r
dotnet sln ReadingList.sln add tests/ReadingList.Api.Tests/ReadingList.Api.Tests.csproj\r
\`\`\`\r
\r
A project reference is not the same as a NuGet package reference. Use project references for code in the same solution and package references for shared libraries distributed through NuGet.\r
\r
## Practice check\r
\r
Create the API template, run it, and inspect its project file. Build it before changing anything. Then add a simple endpoint, run again, and use the console address to request it. This separates SDK or restore problems from application code problems.\r
\r
## Common mistakes\r
\r
- Installing only a runtime when you need to compile.\r
- Editing files under bin or obj instead of source files.\r
- Committing local secrets or generated output.\r
- Adding a package without checking whether the framework already includes the feature.\r
- Assuming every template creates the same files across SDK versions.\r
\r
## References\r
\r
- [Install .NET](https://learn.microsoft.com/dotnet/core/install/)\r
- [The .NET CLI](https://learn.microsoft.com/dotnet/core/tools/)\r
- [ASP.NET Core project templates](https://learn.microsoft.com/aspnet/core/fundamentals/?view=aspnetcore-10.0)\r
`,"./chapters/03-hosting-environments-and-configuration.md":`[Back to notes index](../README.md)\r
\r
| [Previous: .NET setup and project structure](02-dotnet-setup-and-project-structure.md) | [Notes index](../README.md) | [Next: Middleware and the request pipeline](04-middleware-and-request-pipeline.md) |\r
| --- | --- | --- |\r
\r
# 3. Hosting, environments, and configuration\r
\r
## The host\r
\r
The host starts the application, loads configuration, builds the dependency injection container, configures logging, and manages the server lifetime. In modern ASP.NET Core, WebApplication.CreateBuilder provides common defaults:\r
\r
\`\`\`csharp\r
var builder = WebApplication.CreateBuilder(args);\r
\r
// Register services and configure the app here.\r
\r
var app = builder.Build();\r
\r
// Configure middleware and map endpoints here.\r
\r
app.Run();\r
\`\`\`\r
\r
The app can read the environment through builder.Environment. Common environment names are Development, Staging, and Production. These are names, not separate framework modes. The environment affects which configuration files and conditional setup are used.\r
\r
## Configuration sources and precedence\r
\r
ASP.NET Core combines configuration providers into one configuration view. Common sources include appsettings.json, appsettings.{Environment}.json, development user secrets, environment variables, and command-line arguments. Later providers override earlier providers for matching keys.\r
\r
A JSON file can contain non-secret defaults:\r
\r
\`\`\`json\r
{\r
  "ReadingList": {\r
    "PageSize": 20,\r
    "AllowGuestReads": true\r
  }\r
}\r
\`\`\`\r
\r
Configuration keys use a colon between levels. Environment variables use a double underscore in place of the colon, so ReadingList__PageSize can override ReadingList:PageSize. This is useful in containers and deployment platforms.\r
\r
Read a value directly when it is a small, one-off setting:\r
\r
\`\`\`csharp\r
var pageSize = builder.Configuration.GetValue<int>("ReadingList:PageSize", 20);\r
\`\`\`\r
\r
For a related group of values, use the options pattern. The next chapter explains registering and validating options in more detail.\r
\r
## Environment-specific behavior\r
\r
Use development-only behavior only in development:\r
\r
\`\`\`csharp\r
if (builder.Environment.IsDevelopment())\r
{\r
    app.UseDeveloperExceptionPage();\r
}\r
\`\`\`\r
\r
The default web host often enables useful development behavior for the Development environment. Do not expose detailed exception pages in production. They can reveal file paths, stack traces, and internal values.\r
\r
Keep a safe baseline in appsettings.json and place environment overrides in appsettings.Development.json or appsettings.Production.json. Environment-specific files are useful for public settings such as a feature flag or endpoint address. They are not a safe place for passwords or API keys in a public repository.\r
\r
## Local secrets\r
\r
For local development, initialize and use the user secrets store from the project directory:\r
\r
\`\`\`bash\r
dotnet user-secrets init\r
dotnet user-secrets set "ConnectionStrings:ReadingList" "replace-with-a-local-value"\r
dotnet user-secrets list\r
\`\`\`\r
\r
User secrets keep values out of the project tree, but they are not an encrypted production vault. Use a managed secret store or the hosting platform's protected configuration for deployed applications. Do not paste real credentials into notes, terminal history, issue reports, or Git.\r
\r
## Practice check\r
\r
Set ReadingList:PageSize in appsettings.json, then override it with an environment variable named ReadingList__PageSize. Log or return the effective value in a local-only endpoint. Remove that endpoint before deploying if the value should not be public.\r
\r
## Common mistakes\r
\r
- Assuming configuration files are loaded in alphabetical order.\r
- Checking the wrong environment name because environment variables differ by host.\r
- Storing credentials in appsettings.json.\r
- Treating user secrets as a production secret manager.\r
- Relying on a missing value to silently become a valid default.\r
\r
## References\r
\r
- [Configuration in ASP.NET Core](https://learn.microsoft.com/aspnet/core/fundamentals/configuration/?view=aspnetcore-10.0)\r
- [Use multiple environments in ASP.NET Core](https://learn.microsoft.com/aspnet/core/fundamentals/environments?view=aspnetcore-10.0)\r
- [Safe storage of app secrets in development](https://learn.microsoft.com/aspnet/core/security/app-secrets?view=aspnetcore-10.0)\r
`,"./chapters/04-middleware-and-request-pipeline.md":`[Back to notes index](../README.md)\r
\r
| [Previous: Hosting, environments, and configuration](03-hosting-environments-and-configuration.md) | [Notes index](../README.md) | [Next: Routing and endpoint design](05-routing-and-endpoints.md) |\r
| --- | --- | --- |\r
\r
# 4. Middleware and the request pipeline\r
\r
## What middleware does\r
\r
Middleware is a component in the HTTP request pipeline. It receives an HttpContext and decides whether to:\r
\r
- Do work before the next component.\r
- Call the next component.\r
- Do work after the next component returns.\r
- Stop the pipeline and produce a response.\r
\r
A request moves through middleware in registration order. The response unwinds in reverse order. A component that does not call the next component short-circuits the request. This is useful for a response that is complete, but it can also accidentally prevent routing or authorization from running.\r
\r
## Build a small pipeline\r
\r
A middleware class can keep cross-cutting work out of endpoint handlers:\r
\r
\`\`\`csharp\r
public sealed class RequestLogMiddleware\r
{\r
    private readonly RequestDelegate _next;\r
    private readonly ILogger<RequestLogMiddleware> _logger;\r
\r
    public RequestLogMiddleware(\r
        RequestDelegate next,\r
        ILogger<RequestLogMiddleware> logger)\r
    {\r
        _next = next;\r
        _logger = logger;\r
    }\r
\r
    public async Task InvokeAsync(HttpContext context)\r
    {\r
        var started = Stopwatch.StartNew();\r
        await _next(context);\r
        started.Stop();\r
\r
        _logger.LogInformation(\r
            "Handled {Method} {Path} with {StatusCode} in {ElapsedMs} ms",\r
            context.Request.Method,\r
            context.Request.Path,\r
            context.Response.StatusCode,\r
            started.ElapsedMilliseconds);\r
    }\r
}\r
\`\`\`\r
\r
Add the required namespace for Stopwatch, then register the middleware before endpoints:\r
\r
\`\`\`csharp\r
app.UseMiddleware<RequestLogMiddleware>();\r
app.MapGet("/health", () => Results.Ok(new { status = "healthy" }));\r
\`\`\`\r
\r
This sample logs a request after the endpoint has completed. ASP.NET Core already provides request logging options through hosting and logging integrations. A custom component is useful when a specific application rule is needed, not just to recreate built-in behavior.\r
\r
## Order changes behavior\r
\r
Register AddProblemDetails before Build when using the no-argument exception handler. A common minimal hosting pipeline is:\r
\r
\`\`\`csharp\r
app.UseExceptionHandler();\r
app.UseHttpsRedirection();\r
app.UseStaticFiles();\r
app.UseRouting();\r
app.UseCors("Frontend");\r
app.UseAuthentication();\r
app.UseAuthorization();\r
\r
app.MapControllers();\r
\`\`\`\r
\r
Register exception handling near the start so it can catch failures from later components. Routing selects an endpoint. Authentication establishes the current user. Authorization checks whether that user may access the selected endpoint. CORS must be placed so the selected endpoint and preflight requests receive the intended policy.\r
\r
WebApplication supplies some routing behavior automatically. Explicit calls are useful when order needs to be clear or a middleware depends on the selected endpoint.\r
\r
## Use, Run, and Map\r
\r
Use adds middleware that can call the next component. Run adds a terminal delegate. Map branches the pipeline based on a path prefix. These methods solve different problems:\r
\r
- Use is for work around downstream processing.\r
- Run is for a final response that ends this branch.\r
- Map is for a path-based branch with its own components.\r
\r
Prefer the built-in middleware for exception handling, authentication, static files, compression, and other standard needs.\r
\r
## Common mistakes\r
\r
- Putting authentication after authorization.\r
- Registering a terminal delegate before an endpoint that should run.\r
- Changing response headers after the response has started.\r
- Reading a request body in middleware without restoring its position for later components.\r
- Logging tokens, passwords, or other sensitive values.\r
\r
## Practice check\r
\r
Add a log before and after the next middleware call. Request an endpoint and note the order of the log entries. Then temporarily make a component return a response without calling the next delegate and observe that later endpoints do not run.\r
\r
## References\r
\r
- [ASP.NET Core middleware](https://learn.microsoft.com/aspnet/core/fundamentals/middleware?view=aspnetcore-10.0)\r
- [Write custom ASP.NET Core middleware](https://learn.microsoft.com/aspnet/core/fundamentals/middleware/write?view=aspnetcore-10.0)\r
`,"./chapters/05-routing-and-endpoints.md":`[Back to notes index](../README.md)\r
\r
| [Previous: Middleware and the request pipeline](04-middleware-and-request-pipeline.md) | [Notes index](../README.md) | [Next: Dependency injection, options, and logging](06-dependency-injection-options-and-logging.md) |\r
| --- | --- | --- |\r
\r
# 5. Routing and endpoint design\r
\r
## Paths, route values, and query strings\r
\r
Routing matches an incoming request to an endpoint. A route template can include literal segments and named parameters:\r
\r
\`\`\`csharp\r
app.MapGet("/reading-items/{id:int}", (int id) =>\r
    Results.Ok(new { Id = id, Title = "Distributed systems notes" }));\r
\`\`\`\r
\r
A request to /reading-items/42 binds 42 to id. The int constraint requires that route segment to parse as an integer. A route constraint helps select a route. It is not a replacement for validation or an authorization check.\r
\r
Use route values to identify a resource, such as /reading-items/42. Use query values for optional filters or pagination, such as /reading-items?isRead=true&page=2. Keep resource routes predictable and use HTTP methods to describe the operation.\r
\r
## Define an endpoint group\r
\r
MapGroup shares a prefix and endpoint metadata:\r
\r
\`\`\`csharp\r
var readingItems = app.MapGroup("/api/reading-items")\r
    .WithTags("Reading items");\r
\r
readingItems.MapGet("/", () =>\r
    Results.Ok(new[] { "Distributed systems notes", "HTTP notes" }));\r
\r
readingItems.MapGet("/{id:int}", (int id) =>\r
    Results.Ok(new { Id = id, Title = "Distributed systems notes" }));\r
\`\`\`\r
\r
A group is useful for applying shared authorization, filters, tags, or a common prefix. Keep endpoints separated by resource and behavior. A single endpoint should not silently perform several unrelated operations.\r
\r
## Route matching details\r
\r
Route templates can include optional parameters, defaults, constraints, and catch-all segments. Use these features only when they make the URL easier to understand. Avoid overlapping templates that differ only in subtle details. Clear route shapes make APIs easier to use and test.\r
\r
Route values are strings until the framework binds them to parameter types. If a value cannot be bound or does not satisfy the route constraint, the endpoint may not match. Query values can be missing, repeated, or malformed, so validate values that affect database queries or resource access.\r
\r
Name routes when another part of the app needs a stable way to generate a link:\r
\r
\`\`\`csharp\r
app.MapGet("/api/reading-items/{id:int}", (int id) =>\r
        Results.Ok(new { Id = id }))\r
    .WithName("GetReadingItem");\r
\`\`\`\r
\r
A route name is application metadata. It does not change the URL by itself.\r
\r
## Endpoint design habits\r
\r
- Use nouns for resource paths and HTTP methods for actions.\r
- Return a resource location after creating a resource when that location is known.\r
- Decide what a missing resource means and use a consistent status code.\r
- Keep URLs independent from internal database table names.\r
- Avoid putting secrets or private data in URLs because URLs can appear in logs and browser history.\r
- Treat route constraints as matching rules, not as security boundaries.\r
\r
## Practice check\r
\r
Add a route for one item and a route for the collection. Try an integer identifier, a non-integer identifier, and an identifier that does not exist. Compare whether the endpoint matched with what the application should return for a missing record.\r
\r
## References\r
\r
- [Routing in ASP.NET Core](https://learn.microsoft.com/aspnet/core/fundamentals/routing?view=aspnetcore-10.0)\r
- [Route groups in Minimal APIs](https://learn.microsoft.com/aspnet/core/fundamentals/minimal-apis/route-handlers?view=aspnetcore-10.0)\r
`,"./chapters/06-dependency-injection-options-and-logging.md":`[Back to notes index](../README.md)\r
\r
| [Previous: Routing and endpoint design](05-routing-and-endpoints.md) | [Notes index](../README.md) | [Next: Minimal APIs](07-minimal-apis.md) |\r
| --- | --- | --- |\r
\r
# 6. Dependency injection, options, and logging\r
\r
## Dependency injection\r
\r
Dependency injection lets a class receive the services it needs instead of constructing them internally. ASP.NET Core has a built-in service container. Register an abstraction and its implementation before building the app:\r
\r
\`\`\`csharp\r
builder.Services.AddScoped<IReadingItemService, ReadingItemService>();\r
\`\`\`\r
\r
A constructor can then receive the service:\r
\r
\`\`\`csharp\r
public sealed class ReadingItemService(IReadingItemStore store)\r
{\r
    public Task<IReadOnlyList<ReadingItem>> GetAllAsync(\r
        CancellationToken cancellationToken) =>\r
        store.GetAllAsync(cancellationToken);\r
}\r
\`\`\`\r
\r
Constructor injection makes dependencies visible and easier to replace in tests. Avoid calling the service provider manually throughout application code. That pattern hides dependencies and makes the object harder to reason about.\r
\r
## Choose a lifetime\r
\r
- Transient creates a new instance each time it is requested.\r
- Scoped creates one instance for a request scope. Entity Framework Core DbContext is normally scoped.\r
- Singleton creates one instance for the application's lifetime.\r
\r
Do not inject a scoped service into a singleton. The singleton would keep a request-scoped object beyond its intended lifetime. A singleton that stores mutable state must be thread-safe. A stateless service can often use a longer lifetime, but scoped is a safe default for request-oriented application services.\r
\r
## Bind and validate options\r
\r
Related configuration belongs in a typed options object:\r
\r
\`\`\`csharp\r
public sealed class ReadingListOptions\r
{\r
    public const string SectionName = "ReadingList";\r
\r
    public int PageSize { get; set; } = 20;\r
}\r
\`\`\`\r
\r
Register the object and validate its values when the app starts:\r
\r
\`\`\`csharp\r
builder.Services\r
    .AddOptions<ReadingListOptions>()\r
    .Bind(builder.Configuration.GetSection(ReadingListOptions.SectionName))\r
    .Validate(options => options.PageSize is > 0 and <= 100,\r
        "PageSize must be between 1 and 100.")\r
    .ValidateOnStart();\r
\`\`\`\r
\r
Options validation moves configuration mistakes to startup instead of letting them fail on the first request. Use IOptions<T> for values that remain fixed after startup. Use IOptionsSnapshot<T> for scoped access to updated values in web apps. Use IOptionsMonitor<T> when a singleton needs to observe changes.\r
\r
## Structured logging\r
\r
Inject ILogger<T> where a class needs to record events:\r
\r
\`\`\`csharp\r
app.MapGet("/api/reading-items", (\r
    ILogger<Program> logger,\r
    IReadingItemService service,\r
    CancellationToken cancellationToken) =>\r
{\r
    logger.LogInformation("Reading the current item collection");\r
    return service.GetAllAsync(cancellationToken);\r
});\r
\`\`\`\r
\r
Structured logging stores values as named fields. Prefer a template such as "Loaded {ItemCount} items" over building a string with concatenation. Do not log credentials, access tokens, session identifiers, or private request bodies.\r
\r
## Practice check\r
\r
Register a small reading-list service, inject it into an endpoint, and log one useful event. Add an invalid PageSize setting and confirm that validation fails during startup. Then correct the value and run the app again.\r
\r
## References\r
\r
- [Dependency injection in ASP.NET Core](https://learn.microsoft.com/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-10.0)\r
- [Options pattern in .NET](https://learn.microsoft.com/dotnet/core/extensions/options)\r
- [Logging in .NET](https://learn.microsoft.com/dotnet/core/extensions/logging)\r
`,"./chapters/07-minimal-apis.md":`[Back to notes index](../README.md)\r
\r
| [Previous: Dependency injection, options, and logging](06-dependency-injection-options-and-logging.md) | [Notes index](../README.md) | [Next: Controllers, REST, and OpenAPI](08-controllers-rest-and-openapi.md) |\r
| --- | --- | --- |\r
\r
# 7. Minimal APIs\r
\r
## When Minimal APIs fit\r
\r
Minimal APIs define HTTP endpoints directly with route mapping methods. They are useful for small services, focused APIs, and applications where endpoint behavior is easy to see in one place. The word minimal describes the endpoint model, not the level of testing, validation, or structure an application should have.\r
\r
A Minimal API can still use dependency injection, middleware, endpoint groups, filters, OpenAPI, and separate application services. Keep business rules out of a large Program.cs file by moving them into services as the app grows.\r
\r
## A small reading-list API\r
\r
This in-memory example supports listing, finding, and creating items:\r
\r
\`\`\`csharp\r
using Microsoft.AspNetCore.Http.HttpResults;\r
\r
var builder = WebApplication.CreateBuilder(args);\r
builder.Services.AddOpenApi();\r
\r
var app = builder.Build();\r
var items = new List<ReadingItem>\r
{\r
    new(1, "HTTP fundamentals", false),\r
    new(2, "Dependency injection", true)\r
};\r
\r
var routes = app.MapGroup("/api/reading-items")\r
    .WithTags("Reading items");\r
\r
routes.MapGet("/", () => TypedResults.Ok(items));\r
\r
routes.MapGet("/{id:int}", (int id) => FindItem(id, items));\r
\r
routes.MapPost("/", (CreateReadingItem request) =>\r
{\r
    var item = new ReadingItem(\r
        items.Count == 0 ? 1 : items.Max(existing => existing.Id) + 1,\r
        request.Title,\r
        false);\r
\r
    items.Add(item);\r
    return TypedResults.Created($"/api/reading-items/{item.Id}", item);\r
});\r
\r
app.MapOpenApi();\r
app.Run();\r
\r
static Results<Ok<ReadingItem>, NotFound> FindItem(\r
    int id,\r
    List<ReadingItem> items)\r
{\r
    var item = items.SingleOrDefault(existing => existing.Id == id);\r
    if (item is null)\r
    {\r
        return TypedResults.NotFound();\r
    }\r
\r
    return TypedResults.Ok(item);\r
}\r
\r
public sealed record ReadingItem(int Id, string Title, bool IsRead);\r
public sealed record CreateReadingItem(string Title);\r
\`\`\`\r
\r
The application stores data in memory, so changes disappear when it restarts. The sample demonstrates endpoint mapping and response types, not durable storage.\r
\r
## Binding and dependency injection\r
\r
Minimal APIs bind simple values from route and query parameters. Complex request objects are read from the request body. Registered services can be supplied as handler parameters. CancellationToken represents the request cancellation signal and should flow to database or network calls.\r
\r
Use explicit types when they make the data source clear. A string parameter whose name matches a route value comes from the route. A search term such as query can come from the query string. A service registered in the container is provided through dependency injection.\r
\r
## Responses and OpenAPI\r
\r
Choose a status code that describes the result. A new resource commonly returns 201 Created and a location. A missing resource returns 404. A successful request that has no body can return 204. Typed results make possible response shapes easier for the compiler and generated API description to understand.\r
\r
Add the OpenAPI package and call AddOpenApi and MapOpenApi to publish an API description document. OpenAPI describes the contract. A visual documentation page is a separate tool and is not automatically the same thing as the OpenAPI document.\r
\r
## Practice check\r
\r
Run the sample and request GET /api/reading-items, GET /api/reading-items/1, and POST /api/reading-items with a JSON body containing a title. Restart the app and observe why the collection resets. Replace the list with a database-backed service in the data chapter.\r
\r
## Common mistakes\r
\r
- Leaving all routes, persistence, validation, and business rules in one file.\r
- Returning 200 for every outcome.\r
- Assuming an in-memory collection is persistent or safe for concurrent writes.\r
- Accepting a request object without validating its values.\r
- Publishing development-only API details unintentionally.\r
\r
## References\r
\r
- [APIs overview](https://learn.microsoft.com/aspnet/core/fundamentals/apis?view=aspnetcore-10.0)\r
- [Minimal APIs overview](https://learn.microsoft.com/aspnet/core/fundamentals/minimal-apis/overview?view=aspnetcore-10.0)\r
- [OpenAPI support in ASP.NET Core](https://learn.microsoft.com/aspnet/core/fundamentals/openapi/aspnetcore-openapi?view=aspnetcore-10.0)\r
`,"./chapters/08-controllers-rest-and-openapi.md":`[Back to notes index](../README.md)\r
\r
| [Previous: Minimal APIs](07-minimal-apis.md) | [Notes index](../README.md) | [Next: Model binding, validation, and filters](09-model-binding-validation-and-filters.md) |\r
| --- | --- | --- |\r
\r
# 8. Controllers, REST, and OpenAPI\r
\r
## Controller responsibilities\r
\r
Controllers group related HTTP actions into classes. They fit APIs that benefit from a clear class boundary, attributes, action filters, and familiar MVC conventions. Register controllers and map them in Program.cs:\r
\r
\`\`\`csharp\r
builder.Services.AddControllers();\r
builder.Services.AddOpenApi();\r
\r
var app = builder.Build();\r
\r
app.MapOpenApi();\r
app.MapControllers();\r
\`\`\`\r
\r
The controller should translate HTTP input into an application service call and translate the result into an HTTP response. Keep business rules in services so they can be tested without constructing an HTTP request.\r
\r
## A controller for reading items\r
\r
This example assumes the application service returns null when an item does not exist:\r
\r
\`\`\`csharp\r
[ApiController]\r
[Route("api/reading-items")]\r
public sealed class ReadingItemsController(\r
    IReadingItemService service) : ControllerBase\r
{\r
    [HttpGet]\r
    public async Task<ActionResult<IReadOnlyList<ReadingItem>>> GetAll(\r
        CancellationToken cancellationToken)\r
    {\r
        var items = await service.GetAllAsync(cancellationToken);\r
        return Ok(items);\r
    }\r
\r
    [HttpGet("{id:int}")]\r
    public async Task<ActionResult<ReadingItem>> GetById(\r
        int id,\r
        CancellationToken cancellationToken)\r
    {\r
        var item = await service.GetByIdAsync(id, cancellationToken);\r
        if (item is null)\r
        {\r
            return NotFound();\r
        }\r
\r
        return Ok(item);\r
    }\r
\r
    [HttpPost]\r
    public async Task<ActionResult<ReadingItem>> Create(\r
        CreateReadingItemRequest request,\r
        CancellationToken cancellationToken)\r
    {\r
        var item = await service.CreateAsync(\r
            request.Title,\r
            cancellationToken);\r
\r
        return CreatedAtAction(\r
            nameof(GetById),\r
            new { id = item.Id },\r
            item);\r
    }\r
}\r
\`\`\`\r
\r
A request DTO keeps the public contract separate from an EF Core entity:\r
\r
\`\`\`csharp\r
public sealed record CreateReadingItemRequest(\r
    [Required, StringLength(120)] string Title);\r
\`\`\`\r
\r
Add the DataAnnotations namespace for Required and StringLength. With ApiController, invalid model state normally produces a 400 response before the action runs.\r
\r
## HTTP contract choices\r
\r
Use a consistent resource path and return meaningful status codes:\r
\r
- GET collection returns 200 and a collection, including an empty collection when there are no items.\r
- GET one item returns 200 or 404.\r
- POST creates an item and commonly returns 201 with a location.\r
- PUT replaces a resource and commonly returns 200 or 204.\r
- DELETE commonly returns 204 after a successful removal.\r
\r
A controller does not make an API RESTful by itself. A clear resource model, appropriate methods, status codes, and stable representations matter more than the class style.\r
\r
## OpenAPI\r
\r
OpenAPI is a machine-readable description of routes, parameters, request bodies, and response shapes. It helps client generation and API review. Keep response contracts accurate and avoid exposing internal database models as public response types. The OpenAPI document is separate from a visual API browser, which may require an additional tool.\r
\r
## Practice check\r
\r
Register a controller, request the collection, request an unknown identifier, and submit an empty title. Check the status code and response body for each case. Add a successful POST and confirm that the returned location points to the new item.\r
\r
## Common mistakes\r
\r
- Returning EF Core entities directly from every endpoint.\r
- Putting persistence and business rules inside controller actions.\r
- Returning 200 when the resource was not found.\r
- Accepting an entity as the write request and allowing clients to set server-owned fields.\r
- Documenting response codes that the action never returns.\r
\r
## References\r
\r
- [Controllers in ASP.NET Core Web API](https://learn.microsoft.com/aspnet/core/web-api/?view=aspnetcore-10.0)\r
- [Create web APIs with controllers](https://learn.microsoft.com/aspnet/core/web-api/?view=aspnetcore-10.0)\r
- [OpenAPI support in ASP.NET Core](https://learn.microsoft.com/aspnet/core/fundamentals/openapi/aspnetcore-openapi?view=aspnetcore-10.0)\r
`,"./chapters/09-model-binding-validation-and-filters.md":`[Back to notes index](../README.md)\r
\r
| [Previous: Controllers, REST, and OpenAPI](08-controllers-rest-and-openapi.md) | [Notes index](../README.md) | [Next: Razor Pages and MVC](10-razor-pages-and-mvc.md) |\r
| --- | --- | --- |\r
\r
# 9. Model binding, validation, and filters\r
\r
## Model binding sources\r
\r
Model binding turns request data into method parameters or objects. In controller actions, common sources are:\r
\r
- Route values for a resource identifier.\r
- Query values for search, filtering, and paging.\r
- Request bodies for JSON or another configured format.\r
- Form fields for browser form submissions.\r
- Headers for values that belong in a header.\r
- Services from dependency injection.\r
\r
Make the source clear when a method has values with similar names:\r
\r
\`\`\`csharp\r
[HttpGet("search")]\r
public IActionResult Search(\r
    [FromQuery] string? term,\r
    [FromQuery] int page = 1)\r
{\r
    if (page < 1)\r
    {\r
        return BadRequest("Page must be positive.");\r
    }\r
\r
    return Ok(new { term, page });\r
}\r
\`\`\`\r
\r
A request body is usually read once. Avoid trying to bind the same body to multiple parameters.\r
\r
## Validate the shape of input\r
\r
Use a request DTO with validation rules:\r
\r
\`\`\`csharp\r
public sealed class CreateReadingItemRequest\r
{\r
    [Required]\r
    [StringLength(120, MinimumLength = 2)]\r
    public string Title { get; set; } = string.Empty;\r
}\r
\`\`\`\r
\r
Add the System.ComponentModel.DataAnnotations namespace. An API controller marked with ApiController automatically returns a 400 response when model validation fails. For MVC views, invalid model state should be shown back to the user with useful field messages.\r
\r
Validation has layers:\r
\r
1. Binding checks whether request data can be converted to the target type.\r
2. DTO validation checks whether the shape and basic values are acceptable.\r
3. Application rules check whether the operation makes sense in the current state.\r
4. Authorization checks whether this user may perform the operation.\r
\r
A DTO attribute cannot prove that a title is unique in the database. That rule belongs in application logic and must handle concurrent requests safely.\r
\r
## Avoid over-posting\r
\r
Do not bind a database entity directly from untrusted input when the entity contains fields the client must not control. A dedicated request type makes the accepted fields explicit. Assign server-owned values such as owner ID, creation time, and permission flags in trusted server code.\r
\r
Return a separate response type when the client should see only part of the stored record. That keeps internal columns out of the public contract.\r
\r
## Filters and middleware\r
\r
Filters run at specific points around MVC actions or endpoint execution:\r
\r
- Authorization filters run early and are for authorization decisions.\r
- Resource filters wrap much of MVC processing.\r
- Action filters run before and after a controller action.\r
- Exception filters handle some MVC action exceptions.\r
- Result filters wrap result execution.\r
- Endpoint filters wrap Minimal API handlers and can inspect bound arguments.\r
\r
Middleware covers the whole request pipeline and works across endpoint types. A filter is more focused on MVC or a specific endpoint group. Prefer the narrowest layer that matches the behavior.\r
\r
## Practice check\r
\r
Add a search action with a query term and page value. Send valid input, a page of zero, and a malformed page. Add a request DTO with title length rules and test empty, too short, valid, and too long titles.\r
\r
## Common mistakes\r
\r
- Treating client-side validation as a security boundary.\r
- Using one database entity as both request and response.\r
- Returning framework exception text to explain invalid input.\r
- Putting authorization decisions in a model validator.\r
- Adding a filter when middleware or a service is the simpler fit.\r
\r
## References\r
\r
- [Model binding in ASP.NET Core](https://learn.microsoft.com/aspnet/core/mvc/models/model-binding?view=aspnetcore-10.0)\r
- [Model validation in ASP.NET Core](https://learn.microsoft.com/aspnet/core/mvc/models/validation?view=aspnetcore-10.0)\r
- [Filters in ASP.NET Core](https://learn.microsoft.com/aspnet/core/mvc/controllers/filters?view=aspnetcore-10.0)\r
`,"./chapters/10-razor-pages-and-mvc.md":`[Back to notes index](../README.md)\r
\r
| [Previous: Model binding, validation, and filters](09-model-binding-validation-and-filters.md) | [Notes index](../README.md) | [Next: Blazor Web Apps](11-blazor-web-apps.md) |\r
| --- | --- | --- |\r
\r
# 10. Razor Pages and MVC\r
\r
## Server-rendered pages\r
\r
Razor uses HTML markup with C# expressions to render a response on the server. The browser receives HTML. A small interactive feature can use ordinary HTML forms or JavaScript; a server-rendered page does not require a single-page application framework.\r
\r
Razor Pages organizes a page and its PageModel together. MVC separates controllers, views, and view models. Choose the shape that makes the application easy to understand. Both use routing, model binding, validation, dependency injection, and the same ASP.NET Core host.\r
\r
## Razor Pages form\r
\r
A page file can contain a post form:\r
\r
\`\`\`html\r
@page\r
@model CreateModel\r
\r
<form method="post">\r
    <label asp-for="Input.Title"></label>\r
    <input asp-for="Input.Title" />\r
    <span asp-validation-for="Input.Title"></span>\r
    <button type="submit">Add item</button>\r
</form>\r
\`\`\`\r
\r
Enable the standard tag helpers in Pages/_ViewImports.cshtml:\r
\r
\`\`\`cshtml\r
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers\r
\`\`\`\r
\r
The PageModel receives the input and handles the request:\r
\r
\`\`\`csharp\r
public sealed class CreateModel(IReadingItemService service) : PageModel\r
{\r
    [BindProperty]\r
    public CreateReadingItemRequest Input { get; set; } = new();\r
\r
    public async Task<IActionResult> OnPostAsync(\r
        CancellationToken cancellationToken)\r
    {\r
        if (!ModelState.IsValid)\r
        {\r
            return Page();\r
        }\r
\r
        await service.CreateAsync(Input.Title, cancellationToken);\r
        return RedirectToPage("Index");\r
    }\r
}\r
\`\`\`\r
\r
A normal form generated by the Form Tag Helper includes an antiforgery token. Keep server validation even when client-side validation is enabled. Client checks improve feedback, but a caller can send a request without using the page.\r
\r
## MVC shape\r
\r
MVC uses a controller action to select data and a view to render it:\r
\r
\`\`\`csharp\r
public sealed class ReadingItemsController(\r
    IReadingItemService service) : Controller\r
{\r
    public async Task<IActionResult> Index(\r
        CancellationToken cancellationToken)\r
    {\r
        var items = await service.GetAllAsync(cancellationToken);\r
        return View(items);\r
    }\r
}\r
\`\`\`\r
\r
The default view path is Views/ReadingItems/Index.cshtml. Pass a view model that contains only what the page needs. Avoid using a database entity as a view model when that would expose persistence details or allow unexpected fields to be submitted.\r
\r
## Choose a page model\r
\r
Razor Pages works well when a page owns its request handlers and form state. MVC works well when several views are organized around a controller or the application already uses the controller pattern. Blazor is a different UI model with interactive components and is covered in the next chapter.\r
\r
## Practice check\r
\r
Create a page that lists reading items and a page that accepts a title. Try an empty title, a valid title, and a refresh after a successful post. Use the post-redirect-get pattern so reloading the result page does not repeat the form submission.\r
\r
## Common mistakes\r
\r
- Returning a page after a successful post instead of redirecting.\r
- Trusting browser-side validation without validating on the server.\r
- Putting persistence logic into the markup.\r
- Forgetting to show validation messages.\r
- Mixing Razor Pages, MVC, and Blazor concepts because they all use Razor syntax.\r
\r
## References\r
\r
- [Razor Pages in ASP.NET Core](https://learn.microsoft.com/aspnet/core/razor-pages/?view=aspnetcore-10.0)\r
- [Views in ASP.NET Core MVC](https://learn.microsoft.com/aspnet/core/mvc/views/overview?view=aspnetcore-10.0)\r
- [Tag Helpers in forms](https://learn.microsoft.com/aspnet/core/mvc/views/working-with-forms?view=aspnetcore-10.0)\r
`,"./chapters/11-blazor-web-apps.md":`[Back to notes index](../README.md)\r
\r
| [Previous: Razor Pages and MVC](10-razor-pages-and-mvc.md) | [Notes index](../README.md) | [Next: Data access with Entity Framework Core](12-data-access-with-ef-core.md) |\r
| --- | --- | --- |\r
\r
# 11. Blazor Web Apps\r
\r
## Component model\r
\r
Blazor builds interactive web interfaces from reusable Razor components. A component combines markup, parameters, event handlers, and state. Unlike Razor Pages and MVC, where each request usually renders a new page, an interactive component can update part of the interface when its state changes.\r
\r
The Blazor Web App template supports static server rendering and interactive render modes. Choose a render mode based on the interaction and hosting needs:\r
\r
- Static server rendering returns HTML from the server without a live component connection.\r
- Interactive Server handles component events over a server connection.\r
- Interactive WebAssembly runs component code in the browser.\r
- Interactive Auto can use server interactivity first and WebAssembly after the client assets are available.\r
\r
Each mode has different startup, latency, state, and deployment tradeoffs. Server interactivity uses a circuit associated with a client connection. WebAssembly code runs in the browser and must not contain server secrets.\r
\r
## Enable Interactive Server\r
\r
Register the server component services and map the render mode in Program.cs:\r
\r
\`\`\`csharp\r
builder.Services\r
    .AddRazorComponents()\r
    .AddInteractiveServerComponents();\r
\r
var app = builder.Build();\r
\r
app.MapRazorComponents<App>()\r
    .AddInteractiveServerRenderMode();\r
\`\`\`\r
\r
A component can opt into the mode:\r
\r
\`\`\`razor\r
@page "/counter"\r
@rendermode InteractiveServer\r
\r
<PageTitle>Counter</PageTitle>\r
\r
<h1>Reading list counter</h1>\r
<p>Items added: @count</p>\r
<button @onclick="AddOne">Add one</button>\r
\r
@code {\r
    private int count;\r
\r
    private void AddOne()\r
    {\r
        count++;\r
    }\r
}\r
\`\`\`\r
\r
If the render mode name is not in scope, add the appropriate RenderMode import in _Imports.razor. Follow the template generated by the installed SDK because it already includes the standard component setup.\r
\r
## State and forms\r
\r
Component fields hold state for that component instance. In Interactive Server, component state belongs to the server-side circuit. In WebAssembly, component state belongs to the browser process. Neither should be treated as durable storage. Save important changes through an application service and data store.\r
\r
EditForm works with validation components such as DataAnnotationsValidator and ValidationSummary. Validate on the server as well when a command reaches an API or service. A hidden button or disabled UI control is not an authorization rule.\r
\r
Use parameters for parent-to-child data, EventCallback for child-to-parent notifications, and injected services for application behavior. Keep components small enough that the rendered state and event handling remain easy to follow.\r
\r
## Practice check\r
\r
Create a counter component and test it with static rendering and Interactive Server. Notice that the static page has no live event handling until an interactive render mode is enabled. Then move the count into a scoped application service and compare what happens when the browser reconnects.\r
\r
## Common mistakes\r
\r
- Assuming every component is interactive by default.\r
- Putting secrets or trusted authorization decisions in WebAssembly code.\r
- Treating component state as a database.\r
- Performing slow synchronous work during event handling.\r
- Forgetting to enable the selected render mode in the host.\r
\r
## References\r
\r
- [Blazor overview](https://learn.microsoft.com/aspnet/core/blazor/?view=aspnetcore-10.0)\r
- [Blazor render modes](https://learn.microsoft.com/aspnet/core/blazor/components/render-modes?view=aspnetcore-10.0)\r
- [Blazor forms and validation](https://learn.microsoft.com/aspnet/core/blazor/forms/?view=aspnetcore-10.0)\r
`,"./chapters/12-data-access-with-ef-core.md":`[Back to notes index](../README.md)\r
\r
| [Previous: Blazor Web Apps](11-blazor-web-apps.md) | [Notes index](../README.md) | [Next: Authentication, Identity, and cookies](13-authentication-identity-and-cookies.md) |\r
| --- | --- | --- |\r
\r
# 12. Data access with Entity Framework Core\r
\r
## DbContext and entities\r
\r
Entity Framework Core maps .NET objects to a database. A DbContext represents a unit of work and tracks changes until they are saved. In a web app, register it with AddDbContext so each request receives a scoped instance.\r
\r
A small context can expose a set of reading items:\r
\r
\`\`\`csharp\r
public sealed class ReadingDbContext(\r
    DbContextOptions<ReadingDbContext> options) : DbContext(options)\r
{\r
    public DbSet<ReadingItem> ReadingItems => Set<ReadingItem>();\r
}\r
\r
public sealed class ReadingItem\r
{\r
    public int Id { get; set; }\r
    public string Title { get; set; } = string.Empty;\r
    public bool IsRead { get; set; }\r
}\r
\`\`\`\r
\r
Install a provider that matches the database, such as Microsoft.EntityFrameworkCore.Sqlite for SQLite. Register the context:\r
\r
\`\`\`csharp\r
var connectionString =\r
    builder.Configuration.GetConnectionString("ReadingList");\r
\r
builder.Services.AddDbContext<ReadingDbContext>(options =>\r
    options.UseSqlite(connectionString));\r
\`\`\`\r
\r
Add the namespace for the selected provider. Keep credentials and production connection strings in protected configuration.\r
\r
The response type used in the projections can be a small record:\r
\r
\`\`\`csharp\r
public sealed record ReadingItemResponse(int Id, string Title, bool IsRead);\r
\`\`\`\r
\r
## Query asynchronously\r
\r
A read-only query does not need change tracking:\r
\r
\`\`\`csharp\r
app.MapGet("/api/reading-items", async (\r
    ReadingDbContext db,\r
    CancellationToken cancellationToken) =>\r
{\r
    var items = await db.ReadingItems\r
        .AsNoTracking()\r
        .OrderBy(item => item.Title)\r
        .Select(item => new ReadingItemResponse(\r
            item.Id,\r
            item.Title,\r
            item.IsRead))\r
        .ToListAsync(cancellationToken);\r
\r
    return TypedResults.Ok(items);\r
});\r
\`\`\`\r
\r
Projection returns only the fields the API needs. It also prevents a database entity from accidentally becoming the public response contract. Pass CancellationToken to database calls so work can stop when the request is cancelled.\r
\r
For larger result sets, use paging and apply ordering before Skip and Take. Avoid loading an unbounded table into memory.\r
\r
## Save changes\r
\r
\`\`\`csharp\r
app.MapPost("/api/reading-items", async (\r
    CreateReadingItemRequest request,\r
    ReadingDbContext db,\r
    CancellationToken cancellationToken) =>\r
{\r
    var item = new ReadingItem { Title = request.Title };\r
    db.ReadingItems.Add(item);\r
    await db.SaveChangesAsync(cancellationToken);\r
\r
    var response = new ReadingItemResponse(\r
        item.Id,\r
        item.Title,\r
        item.IsRead);\r
\r
    return TypedResults.Created(\r
        $"/api/reading-items/{item.Id}",\r
        response);\r
});\r
\`\`\`\r
\r
SaveChangesAsync writes tracked changes. For relational providers, EF Core uses a transaction for the save operation when one is needed. Use an explicit transaction when a larger operation must be atomic across multiple saves or data stores.\r
\r
## Migrations\r
\r
A migration records a schema change in source control:\r
\r
\`\`\`bash\r
dotnet tool install --global dotnet-ef\r
dotnet add package Microsoft.EntityFrameworkCore.Design\r
dotnet ef migrations add InitialCreate\r
dotnet ef database update\r
\`\`\`\r
\r
Install the design package and provider at a compatible major version. Review generated migrations before applying them. Local database updates are convenient in development. Production schema changes need a controlled deployment plan, backup strategy, and an account with only the permissions required.\r
\r
## Common mistakes\r
\r
- Sharing one DbContext instance across requests.\r
- Running synchronous database calls from asynchronous request handlers.\r
- Returning tracked entities directly from public endpoints.\r
- Calling ToList before applying filters, sorting, and paging.\r
- Applying unreviewed migrations directly to a production database.\r
- Building SQL by concatenating untrusted values.\r
\r
## Practice check\r
\r
Create a local SQLite database, add a migration, save two reading items, and query them with AsNoTracking. Change the entity schema, inspect the generated migration, and apply it to a disposable local database.\r
\r
## References\r
\r
- [Entity Framework Core documentation](https://learn.microsoft.com/ef/core/)\r
- [DbContext configuration in ASP.NET Core](https://learn.microsoft.com/ef/core/dbcontext-configuration/)\r
- [Migrations overview](https://learn.microsoft.com/ef/core/managing-schemas/migrations/)\r
`,"./chapters/13-authentication-identity-and-cookies.md":`[Back to notes index](../README.md)\r
\r
| [Previous: Data access with Entity Framework Core](12-data-access-with-ef-core.md) | [Notes index](../README.md) | [Next: Authorization and web security](14-authorization-and-web-security.md) |\r
| --- | --- | --- |\r
\r
# 13. Authentication, Identity, and cookies\r
\r
## Authentication answers who\r
\r
Authentication establishes the identity associated with a request. Authorization, covered next, decides whether that identity may perform an operation.\r
\r
ASP.NET Core Identity manages user accounts, password hashing, sign-in, roles, tokens, and related account workflows. Use the supported account system rather than writing a password store from scratch. Identity normally stores account data through Entity Framework Core, so the app needs an application user context and a database provider.\r
\r
A typical service setup looks like this:\r
\r
\`\`\`csharp\r
builder.Services\r
    .AddDefaultIdentity<IdentityUser>(options =>\r
    {\r
        options.SignIn.RequireConfirmedAccount = true;\r
        options.Password.RequiredLength = 12;\r
    })\r
    .AddEntityFrameworkStores<ApplicationDbContext>();\r
\`\`\`\r
\r
Templates and package choices differ between Razor Pages, MVC, and API projects. Apply account UI and database setup from the matching ASP.NET Core Identity documentation.\r
\r
## Cookie authentication\r
\r
Browser applications commonly use a protected authentication cookie after sign-in. The browser sends the cookie with later requests. The server validates it and reconstructs the user's identity. Cookie settings should require HTTPS, use an appropriate SameSite policy, and have a deliberate expiration and renewal policy.\r
\r
Authentication middleware must run before authorization middleware:\r
\r
\`\`\`csharp\r
app.UseAuthentication();\r
app.UseAuthorization();\r
\`\`\`\r
\r
Map protected endpoints after the middleware is registered. Cookie authentication uses ASP.NET Core Data Protection to protect ticket data. In a multi-instance deployment, configure a shared and protected key ring so another instance can read the cookie.\r
\r
Sign-out changes server authentication state and should use a protected form or another anti-forgery mechanism. Do not use a state-changing GET request for sign-out.\r
\r
## Tokens for APIs\r
\r
A browser cookie and an access token solve different client scenarios. An API called by a separate client may accept a bearer token issued by a trusted identity provider. Validate issuer, audience, signature, and lifetime with supported authentication middleware. Do not invent a token format or store long-lived bearer tokens in browser-accessible storage without understanding the exposure.\r
\r
Authentication proves the caller's identity. It does not automatically grant access to every resource. Add authorization rules to decide what that identity can do.\r
\r
## Practice check\r
\r
Add the framework identity services to a local app, configure a development database, and exercise registration, confirmation, sign-in, and sign-out. Inspect protected pages while signed in and signed out. Never use a real personal password or production account in a local experiment.\r
\r
## Common mistakes\r
\r
- Storing passwords as plain text or with a custom reversible encoding.\r
- Assuming that a signed-in user is authorized for every record.\r
- Placing signing keys or token secrets in source control.\r
- Disabling cookie security settings to make local testing easier.\r
- Returning authentication tokens in URLs or logs.\r
\r
## References\r
\r
- [Introduction to ASP.NET Core Identity](https://learn.microsoft.com/aspnet/core/security/authentication/identity?view=aspnetcore-10.0)\r
- [Configure cookie authentication](https://learn.microsoft.com/aspnet/core/security/authentication/cookie?view=aspnetcore-10.0)\r
- [Authentication in ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/authentication/?view=aspnetcore-10.0)\r
`,"./chapters/14-authorization-and-web-security.md":`[Back to notes index](../README.md)\r
\r
| [Previous: Authentication, Identity, and cookies](13-authentication-identity-and-cookies.md) | [Notes index](../README.md) | [Next: Error handling, Problem Details, and diagnostics](15-errors-problem-details-and-diagnostics.md) |\r
| --- | --- | --- |\r
\r
# 14. Authorization and web security\r
\r
## Authorization answers what\r
\r
Authorization decides whether the current user may perform an action. A signed-in user is not automatically allowed to edit every reading item.\r
\r
Use policies to express reusable requirements:\r
\r
\`\`\`csharp\r
builder.Services.AddAuthorizationBuilder()\r
    .AddPolicy("ReadingItemEditor", policy =>\r
        policy.RequireRole("Editor"));\r
\`\`\`\r
\r
A controller can require that policy with Authorize, and an endpoint group can use RequireAuthorization. AllowAnonymous should be deliberate and limited to endpoints that are meant to be public.\r
\r
Roles are useful for broad categories. Resource-based authorization is needed when the rule depends on a specific record, such as whether the current user owns the item. Load the resource, then ask IAuthorizationService to evaluate the user and resource. Do not trust an owner ID supplied by the request.\r
\r
## CORS\r
\r
Cross-Origin Resource Sharing controls whether a browser permits a page from one origin to read a response from another origin. It is not authentication and does not stop non-browser clients from sending requests.\r
\r
Configure the known front-end origin:\r
\r
\`\`\`csharp\r
builder.Services.AddCors(options =>\r
{\r
    options.AddPolicy("Frontend", policy =>\r
        policy.WithOrigins("https://app.example.com")\r
            .AllowAnyHeader()\r
            .AllowAnyMethod());\r
});\r
\r
var app = builder.Build();\r
\r
app.UseRouting();\r
app.UseCors("Frontend");\r
app.UseAuthentication();\r
app.UseAuthorization();\r
\`\`\`\r
\r
Do not combine wildcard origins with credentials. Use the smallest list of origins, methods, and headers that the application needs.\r
\r
## Common security boundaries\r
\r
- Enforce HTTPS in production. Use HSTS for sites that are consistently served over HTTPS.\r
- Cookie-authenticated browser requests need protection from cross-site request forgery. Use antiforgery tokens for state-changing forms.\r
- Razor encodes values by default. Avoid rendering untrusted HTML as raw markup.\r
- Use parameterized database operations. Do not concatenate user input into SQL.\r
- Store secrets outside source control and restrict access to them.\r
- Limit upload size and validate file content on the server.\r
- Apply authorization to the server endpoint, even when the interface hides a button.\r
- Use rate limiting where an endpoint is vulnerable to costly or abusive traffic.\r
\r
Security settings depend on how the application is hosted. Proxy headers, cookie domains, redirect URLs, and TLS termination must be configured for the real deployment path.\r
\r
## Practice check\r
\r
Create a policy for users allowed to edit items. Test the endpoint as an anonymous user, a signed-in user without the role, and a user with the role. Add an ownership rule and confirm that changing an item identifier cannot grant access to another user's record.\r
\r
## Common mistakes\r
\r
- Treating CORS as a replacement for authorization.\r
- Allowing any origin because a browser request failed.\r
- Checking ownership using a request field controlled by the caller.\r
- Returning hidden data and relying on the UI to conceal it.\r
- Disabling antiforgery protection on cookie-authenticated forms without an alternative.\r
\r
## References\r
\r
- [Authorization in ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/authorization/introduction?view=aspnetcore-10.0)\r
- [Resource-based authorization](https://learn.microsoft.com/aspnet/core/security/authorization/resourcebased?view=aspnetcore-10.0)\r
- [Enable Cross-Origin Requests](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-10.0)\r
- [Prevent Cross-Site Request Forgery](https://learn.microsoft.com/aspnet/core/security/anti-request-forgery?view=aspnetcore-10.0)\r
`,"./chapters/15-errors-problem-details-and-diagnostics.md":`[Back to notes index](../README.md)\r
\r
| [Previous: Authorization and web security](14-authorization-and-web-security.md) | [Notes index](../README.md) | [Next: Static files, uploads, and downloads](16-static-files-uploads-and-downloads.md) |\r
| --- | --- | --- |\r
\r
# 15. Error handling, Problem Details, and diagnostics\r
\r
## Handle failures centrally\r
\r
An unexpected exception should not become a successful response or expose internal details. Register Problem Details and exception handling near the start of the pipeline:\r
\r
\`\`\`csharp\r
builder.Services.AddProblemDetails();\r
\r
var app = builder.Build();\r
\r
if (app.Environment.IsDevelopment())\r
{\r
    app.UseDeveloperExceptionPage();\r
}\r
else\r
{\r
    app.UseExceptionHandler();\r
    app.UseHsts();\r
}\r
\r
app.UseStatusCodePages();\r
\`\`\`\r
\r
Development exception pages help diagnose local failures. Production responses should be safe and consistent. Log the exception on the server with a request or trace identifier, then return a response that does not reveal stack traces, file paths, or secret values.\r
\r
## Problem Details\r
\r
Problem Details is a standard JSON shape for describing an HTTP error. It can include a status, title, detail, and instance. Keep the detail suitable for the caller. Do not copy exception messages into a public response.\r
\r
An endpoint can return a deliberate problem response:\r
\r
\`\`\`csharp\r
app.MapGet("/api/reading-items/{id:int}", (int id) => GetReadingItem(id));\r
\r
static IResult GetReadingItem(int id)\r
{\r
    if (id < 1)\r
    {\r
        return Results.Problem(\r
            title: "Invalid reading item identifier",\r
            statusCode: StatusCodes.Status400BadRequest);\r
    }\r
\r
    return Results.Ok(new { Id = id, Title = "HTTP fundamentals" });\r
}\r
\`\`\`\r
\r
For an API, use consistent status codes and stable error fields so clients can react without parsing human prose. Validation errors should identify fields and explain how a request can be corrected.\r
\r
## Logs and traces\r
\r
Use structured logging with useful event names and values. Log enough context to understand the failure, but avoid passwords, tokens, session cookies, and private request bodies. Set levels according to importance:\r
\r
- Trace and Debug are for detailed development diagnostics.\r
- Information records normal application events.\r
- Warning records an unexpected condition that the app handled.\r
- Error records an operation that failed.\r
- Critical records a failure that may require immediate attention.\r
\r
Distributed traces connect work across components. ASP.NET Core uses diagnostic activities, and OpenTelemetry can export traces and metrics to an observability platform. Use a trace identifier to connect an API response with the corresponding server logs.\r
\r
## Distinguish expected outcomes from faults\r
\r
A missing record is usually a 404 result, not an exception. Invalid input is usually a 400 response with validation details. An unexpected database outage is an error that should be logged and returned as a safe 5xx response. Use exceptions for exceptional failures, not ordinary branching.\r
\r
## Practice check\r
\r
Make one endpoint return a deliberate validation problem and another throw an exception locally. Compare the client response and the server logs in Development and Production. Confirm that the production response contains no stack trace.\r
\r
## Common mistakes\r
\r
- Returning status 200 with an error message in the body.\r
- Catching every exception and silently returning an empty value.\r
- Returning exception.ToString() to an unauthenticated client.\r
- Logging the same exception at multiple layers with no added context.\r
- Treating a health probe failure as the same thing as an application exception.\r
\r
## References\r
\r
- [Handle errors in ASP.NET Core](https://learn.microsoft.com/aspnet/core/fundamentals/error-handling?view=aspnetcore-10.0)\r
- [Problem Details in ASP.NET Core](https://learn.microsoft.com/aspnet/core/fundamentals/error-handling-api?view=aspnetcore-10.0)\r
- [Logging overview](https://learn.microsoft.com/dotnet/core/extensions/logging)\r
- [Distributed tracing in .NET](https://learn.microsoft.com/dotnet/core/diagnostics/distributed-tracing)\r
`,"./chapters/16-static-files-uploads-and-downloads.md":`[Back to notes index](../README.md)\r
\r
| [Previous: Error handling, Problem Details, and diagnostics](15-errors-problem-details-and-diagnostics.md) | [Notes index](../README.md) | [Next: SignalR and gRPC](17-signalr-and-grpc.md) |\r
| --- | --- | --- |\r
\r
# 16. Static files, uploads, and downloads\r
\r
## Public static assets\r
\r
Files under wwwroot are intended to be served to anyone who can reach the application. Typical examples are stylesheets, browser scripts, icons, and public images. Do not place private reports, user documents, configuration files, or secrets in this directory.\r
\r
For a basic static file setup:\r
\r
\`\`\`csharp\r
app.UseStaticFiles();\r
\`\`\`\r
\r
The middleware serves known file types from the web root. Modern templates can use MapStaticAssets for build-time discovery and optimized delivery of assets. Follow the project template and framework documentation for the chosen approach.\r
\r
## Accept an uploaded file\r
\r
Browser forms send files as multipart/form-data. An upload endpoint must impose a size limit and treat every file property as untrusted. A safe first step is to generate a server-side name and store the file outside the public web root:\r
\r
\`\`\`csharp\r
[HttpPost("uploads")]\r
[RequestSizeLimit(5_000_000)]\r
public async Task<IActionResult> Upload(\r
    IFormFile file,\r
    CancellationToken cancellationToken)\r
{\r
    if (file.Length == 0)\r
    {\r
        return BadRequest("Choose a non-empty file.");\r
    }\r
\r
    var extension = Path.GetExtension(file.FileName);\r
    var allowedExtensions = new HashSet<string>(\r
        StringComparer.OrdinalIgnoreCase)\r
    {\r
        ".pdf",\r
        ".txt"\r
    };\r
\r
    if (!allowedExtensions.Contains(extension))\r
    {\r
        return BadRequest("File type is not allowed.");\r
    }\r
\r
    var storedName = $"{Guid.NewGuid():N}{extension}";\r
    var path = Path.Combine(_uploadDirectory, storedName);\r
\r
    await using var stream = System.IO.File.Create(path);\r
    await file.CopyToAsync(stream, cancellationToken);\r
\r
    return Ok(new { storedName });\r
}\r
\`\`\`\r
\r
The sample checks a suffix only to demonstrate a rule. A file name and declared content type do not prove what the file contains. Production handling should combine an allow-list, size limits, content inspection, malware scanning where appropriate, safe storage permissions, and authorization.\r
\r
## Return a download\r
\r
Do not let a caller pass an arbitrary disk path. Look up a stored file by an application identifier, check access to that record, then return the server-selected file:\r
\r
\`\`\`csharp\r
return PhysicalFile(\r
    storedPath,\r
    "application/pdf",\r
    downloadName: "reading-notes.pdf",\r
    enableRangeProcessing: true);\r
\`\`\`\r
\r
For small in-memory content, FileContentResult can be appropriate. For large content, stream it and apply request cancellation. Protect private downloads with the same access checks as the record that owns the file.\r
\r
## Operational details\r
\r
Upload limits exist at more than one layer. Check application limits, reverse proxy limits, and hosting limits. Use asynchronous stream operations. Avoid loading a large file fully into memory. Consider quotas, retention rules, storage encryption, backup, and deletion when a user removes the associated record.\r
\r
## Practice check\r
\r
Serve a public CSS file from wwwroot. Add a separate upload directory outside that folder. Reject empty or oversized uploads, store accepted files with generated names, and require authorization before downloading them.\r
\r
## Common mistakes\r
\r
- Saving an untrusted original file name directly to disk.\r
- Trusting the browser-provided content type as proof.\r
- Putting private uploads under wwwroot.\r
- Accepting unlimited file sizes.\r
- Returning a physical path supplied by the caller.\r
- Forgetting to remove stored files when their records expire.\r
\r
## References\r
\r
- [Static files in ASP.NET Core](https://learn.microsoft.com/aspnet/core/fundamentals/static-files?view=aspnetcore-10.0)\r
- [Upload files in ASP.NET Core](https://learn.microsoft.com/aspnet/core/mvc/models/file-uploads?view=aspnetcore-10.0)\r
- [Return files from a controller](https://learn.microsoft.com/aspnet/core/mvc/controllers/actions?view=aspnetcore-10.0)\r
`,"./chapters/17-signalr-and-grpc.md":`[Back to notes index](../README.md)\r
\r
| [Previous: Static files, uploads, and downloads](16-static-files-uploads-and-downloads.md) | [Notes index](../README.md) | [Next: Testing ASP.NET Core apps](18-testing-aspnet-core-apps.md) |\r
| --- | --- | --- |\r
\r
# 17. SignalR and gRPC\r
\r
## SignalR for live updates\r
\r
SignalR lets a server send messages to connected clients. A hub is a high-level endpoint for client and server calls. It can use WebSockets when available and other transports when needed.\r
\r
Register and map a hub:\r
\r
\`\`\`csharp\r
builder.Services.AddSignalR();\r
\r
var app = builder.Build();\r
\r
app.MapHub<ReadingListHub>("/hubs/reading-list");\r
\r
public sealed class ReadingListHub : Hub\r
{\r
    public Task JoinList(string listId)\r
    {\r
        return Groups.AddToGroupAsync(\r
            Context.ConnectionId,\r
            $"list-{listId}");\r
    }\r
}\r
\`\`\`\r
\r
A hub method can add a connection to a group. A server-side service can later send a message to that group through IHubContext. Do not store long-lived application state in a hub instance. Hubs are created for calls and connections may be served by different app instances.\r
\r
Every hub method callable by a client is an input boundary. Authenticate callers, verify they may join a group, validate identifiers, and avoid allowing clients to broadcast trusted state changes directly.\r
\r
## gRPC for typed service calls\r
\r
gRPC uses Protocol Buffers contracts and generated client and server code. It is a good fit for efficient service-to-service communication when both ends can use the gRPC protocol. Browser clients may need gRPC-Web or a separate browser-facing API.\r
\r
A contract describes the service and message shape:\r
\r
\`\`\`proto\r
syntax = "proto3";\r
\r
package readinglist;\r
\r
service ReadingList {\r
  rpc GetItem (GetItemRequest) returns (ReadingItemReply);\r
}\r
\r
message GetItemRequest {\r
  int32 id = 1;\r
}\r
\r
message ReadingItemReply {\r
  int32 id = 1;\r
  string title = 2;\r
  bool is_read = 3;\r
}\r
\`\`\`\r
\r
ASP.NET Core generates service base types from the contract. The app registers gRPC services and maps an implementation with MapGrpcService. Keep the protocol contract versioned carefully because clients and servers may be deployed at different times.\r
\r
gRPC supports unary calls, client streaming, server streaming, and bidirectional streaming. Use the simplest shape that fits the communication.\r
\r
## Choose the communication style\r
\r
- Use ordinary HTTP APIs for broad client compatibility and resource-oriented operations.\r
- Use SignalR when connected clients need low-latency updates or two-way messages.\r
- Use gRPC for strongly typed calls between services where its transport and tooling fit.\r
\r
These choices can coexist. A browser-facing API may update data and a SignalR event may notify connected clients that the list changed.\r
\r
## Practice check\r
\r
Create a hub with one read-only notification event and connect a local browser client. Add server-side authorization before allowing a connection to a private group. For gRPC, define one request and response in a proto file and inspect the generated service base class.\r
\r
## Common mistakes\r
\r
- Treating a group name as proof that a user may see the group's messages.\r
- Keeping authoritative data only in a hub instance.\r
- Letting a client send trusted state changes without server validation.\r
- Choosing gRPC for a browser client without checking browser transport support.\r
- Changing a protobuf field number after clients depend on it.\r
\r
## References\r
\r
- [SignalR in ASP.NET Core](https://learn.microsoft.com/aspnet/core/signalr/introduction?view=aspnetcore-10.0)\r
- [SignalR hubs](https://learn.microsoft.com/aspnet/core/signalr/hubs?view=aspnetcore-10.0)\r
- [gRPC services in ASP.NET Core](https://learn.microsoft.com/aspnet/core/grpc/?view=aspnetcore-10.0)\r
`,"./chapters/18-testing-aspnet-core-apps.md":`[Back to notes index](../README.md)\r
\r
| [Previous: SignalR and gRPC](17-signalr-and-grpc.md) | [Notes index](../README.md) | [Next: Performance, health checks, and deployment](19-performance-health-and-deployment.md) |\r
| --- | --- | --- |\r
\r
# 18. Testing ASP.NET Core apps\r
\r
## Test at the right level\r
\r
A unit test checks one class or rule without starting the web host. It is fast and helps explain the expected behavior of a service. An integration test starts the application in a test host and exercises routing, middleware, binding, filters, and serialization together.\r
\r
Use integration tests for behavior that depends on the HTTP pipeline. Avoid duplicating every small assertion at both levels. Keep test data independent so a test does not depend on execution order.\r
\r
## Create a test host\r
\r
Add the Microsoft.AspNetCore.Mvc.Testing package to the test project. For top-level Program.cs, expose the generated Program type to the test assembly:\r
\r
\`\`\`csharp\r
public partial class Program { }\r
\`\`\`\r
\r
A test can use WebApplicationFactory to make an in-process client:\r
\r
\`\`\`csharp\r
public sealed class HealthEndpointTests(\r
    WebApplicationFactory<Program> factory)\r
    : IClassFixture<WebApplicationFactory<Program>>\r
{\r
    private readonly HttpClient _client = factory.CreateClient();\r
\r
    [Fact]\r
    public async Task Health_returns_success()\r
    {\r
        var response = await _client.GetAsync("/health");\r
\r
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);\r
    }\r
}\r
\`\`\`\r
\r
Add the xUnit and MVC testing namespaces to the test file. This test sends an HTTP request through the app rather than calling an endpoint delegate directly.\r
\r
For richer tests, derive from WebApplicationFactory and configure test services. Replace a production service with a fake, or provide a test database. Ensure the database provider behaves like the production provider for the behavior under test. EF Core's in-memory provider does not behave like a relational database.\r
\r
## Test important outcomes\r
\r
Test successful requests and important failures:\r
\r
- The expected status code and response shape.\r
- Invalid input and validation responses.\r
- Missing records and authorization denials.\r
- Authentication requirements.\r
- Database behavior that matters to users.\r
- Error responses without internal exception data.\r
\r
Use representative inputs. A test name should say what behavior it verifies. Avoid tests that only repeat a private implementation detail.\r
\r
## Run tests\r
\r
\`\`\`bash\r
dotnet test\r
dotnet test --filter FullyQualifiedName~HealthEndpointTests\r
\`\`\`\r
\r
Run the full suite before pushing a change that affects shared behavior. If tests use external services, make that dependency explicit and provide a local test configuration or a documented test environment.\r
\r
## Common mistakes\r
\r
- Making an integration test call a production database.\r
- Sharing mutable test data between parallel tests.\r
- Checking only that a response is 200 without checking the important body.\r
- Using the in-memory EF provider to make claims about SQL behavior.\r
- Bypassing middleware in a test intended to verify the full request pipeline.\r
\r
## Practice check\r
\r
Add a test for the reading-list collection and a test for a missing item. Add a validation test for an empty title. Then replace the database service for tests and confirm no test needs an external production account.\r
\r
## References\r
\r
- [Integration tests in ASP.NET Core](https://learn.microsoft.com/aspnet/core/test/integration-tests?view=aspnetcore-10.0)\r
- [Unit testing in .NET](https://learn.microsoft.com/dotnet/core/testing/unit-testing-with-dotnet-test)\r
- [Testing EF Core applications](https://learn.microsoft.com/ef/core/testing/)\r
`,"./chapters/19-performance-health-and-deployment.md":`[Back to notes index](../README.md)\r
\r
| [Previous: Testing ASP.NET Core apps](18-testing-aspnet-core-apps.md) | [Notes index](../README.md) | [Next: All code samples](98-all-code-samples.md) |\r
| --- | --- | --- |\r
\r
# 19. Performance, health checks, and deployment\r
\r
## Measure before changing code\r
\r
Performance work starts with a measurement and a clear goal. Record response time, throughput, memory use, database query time, and error rates for representative traffic. Use logs, metrics, traces, and .NET diagnostic tools to find the bottleneck instead of guessing.\r
\r
For request handlers:\r
\r
- Use asynchronous APIs for I/O and pass CancellationToken through the call chain.\r
- Avoid blocking on Task.Result or Task.Wait.\r
- Select only the data the response needs.\r
- Page large collections and use indexes that match common filters.\r
- Set limits for request size and expensive operations.\r
- Avoid creating large temporary object graphs for every request.\r
\r
Caching can improve response time, but it also creates an invalidation and privacy problem. In-memory cache belongs to one process. A distributed cache can be shared by several instances. Output caching stores endpoint responses and must be configured so user-specific content is not shared between users.\r
\r
## Health checks\r
\r
Health checks let a hosting platform or orchestrator ask whether the process is alive or ready for traffic:\r
\r
\`\`\`csharp\r
builder.Services.AddHealthChecks();\r
\r
var app = builder.Build();\r
\r
app.MapHealthChecks("/health/live");\r
\`\`\`\r
\r
A liveness check should answer whether the process can keep running. A readiness check can include critical dependencies such as a database. Do not reveal connection strings, internal hostnames, or sensitive diagnostic details in an unauthenticated health response. Add dependency checks through the matching provider package when needed.\r
\r
## Publish the app\r
\r
Publish creates the files needed to deploy an application:\r
\r
\`\`\`bash\r
dotnet restore\r
dotnet test\r
dotnet publish -c Release -o ./publish\r
\`\`\`\r
\r
Choose framework-dependent deployment when the host provides the matching runtime. Choose self-contained deployment when the app must carry its runtime. Verify operating system, architecture, environment configuration, and hosting requirements before publishing.\r
\r
## Reverse proxies and production settings\r
\r
Kestrel can run behind a reverse proxy or a managed hosting service. Forwarded headers carry the original client and scheme information through trusted infrastructure. Configure forwarded-header handling only for known proxies or networks, and run it early enough for later HTTPS and redirect logic to see the correct values.\r
\r
Production deployments should provide:\r
\r
- Current supported runtime patches.\r
- Protected secrets and connection strings.\r
- Durable shared storage for databases and uploads.\r
- A shared protected Data Protection key ring when several instances read the same authentication cookies.\r
- Health and readiness checks.\r
- Centralized logs, metrics, and traces.\r
- A tested backup and rollback plan.\r
\r
Use the hosting platform's deployment guidance for TLS, process management, scaling, and network rules. Local launch settings are for development and are not a production configuration source.\r
\r
## Practice check\r
\r
Publish the reading-list app in Release mode and run it from the publish directory. Configure a readiness check that verifies the database. Test behind a local reverse proxy and confirm generated redirects use the public HTTPS scheme.\r
\r
## Common mistakes\r
\r
- Optimizing before identifying a bottleneck.\r
- Using process memory as durable state in a scaled app.\r
- Sharing cached private responses between different users.\r
- Treating liveness as proof that all dependencies are ready.\r
- Trusting forwarded headers from arbitrary clients.\r
- Deploying without applying supported runtime patches.\r
\r
## References\r
\r
- [Performance best practices for ASP.NET Core](https://learn.microsoft.com/aspnet/core/performance/performance-best-practices?view=aspnetcore-10.0)\r
- [Health checks in ASP.NET Core](https://learn.microsoft.com/aspnet/core/host-and-deploy/health-checks?view=aspnetcore-10.0)\r
- [Host and deploy ASP.NET Core](https://learn.microsoft.com/aspnet/core/host-and-deploy/?view=aspnetcore-10.0)\r
- [.NET support policy](https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core)\r
`,"./chapters/98-all-code-samples.md":`[Back to notes index](../README.md)\r
\r
| [Previous: Performance, health checks, and deployment](19-performance-health-and-deployment.md) | [Notes index](../README.md) | [Next: Complete questions and answers](99-complete-q-and-a.md) |\r
| --- | --- | --- |\r
\r
# 98. All code samples\r
\r
This chapter gathers every fenced code sample from the core chapters in one place. Each section links back to the notes that explain the sample.\r
\r
## 1. ASP.NET Core and HTTP basics\r
\r
[Open chapter](01-aspnet-core-and-http.md)\r
\r
### Sample 1\r
\r
\`\`\`csharp\r
var builder = WebApplication.CreateBuilder(args);\r
var app = builder.Build();\r
\r
app.MapGet("/", () => Results.Text("Reading list service"));\r
app.MapGet("/health", () => Results.Ok(new { status = "healthy" }));\r
\r
app.Run();\r
\`\`\`\r
\r
### Sample 2\r
\r
\`\`\`bash\r
curl -i https://localhost:5001/health\r
\`\`\`\r
\r
## 2. .NET setup and project structure\r
\r
[Open chapter](02-dotnet-setup-and-project-structure.md)\r
\r
### Sample 1\r
\r
\`\`\`bash\r
dotnet --info\r
dotnet --list-sdks\r
dotnet --list-runtimes\r
\`\`\`\r
\r
### Sample 2\r
\r
\`\`\`bash\r
dotnet new webapi -n ReadingList.Api\r
cd ReadingList.Api\r
dotnet run\r
\`\`\`\r
\r
### Sample 3\r
\r
\`\`\`bash\r
dotnet new webapi --use-controllers -n ReadingList.Api\r
\`\`\`\r
\r
### Sample 4\r
\r
\`\`\`bash\r
dotnet new webapp -n ReadingList.Web\r
dotnet new blazor -n ReadingList.Blazor\r
\`\`\`\r
\r
### Sample 5\r
\r
\`\`\`xml\r
<Project Sdk="Microsoft.NET.Sdk.Web">\r
  <PropertyGroup>\r
    <TargetFramework>net10.0</TargetFramework>\r
    <Nullable>enable</Nullable>\r
    <ImplicitUsings>enable</ImplicitUsings>\r
  </PropertyGroup>\r
</Project>\r
\`\`\`\r
\r
### Sample 6\r
\r
\`\`\`bash\r
dotnet restore\r
dotnet build\r
dotnet run\r
dotnet watch\r
dotnet test\r
\`\`\`\r
\r
### Sample 7\r
\r
\`\`\`bash\r
dotnet new sln -n ReadingList\r
dotnet sln ReadingList.sln add src/ReadingList.Api/ReadingList.Api.csproj\r
dotnet sln ReadingList.sln add tests/ReadingList.Api.Tests/ReadingList.Api.Tests.csproj\r
\`\`\`\r
\r
## 3. Hosting, environments, and configuration\r
\r
[Open chapter](03-hosting-environments-and-configuration.md)\r
\r
### Sample 1\r
\r
\`\`\`csharp\r
var builder = WebApplication.CreateBuilder(args);\r
\r
// Register services and configure the app here.\r
\r
var app = builder.Build();\r
\r
// Configure middleware and map endpoints here.\r
\r
app.Run();\r
\`\`\`\r
\r
### Sample 2\r
\r
\`\`\`json\r
{\r
  "ReadingList": {\r
    "PageSize": 20,\r
    "AllowGuestReads": true\r
  }\r
}\r
\`\`\`\r
\r
### Sample 3\r
\r
\`\`\`csharp\r
var pageSize = builder.Configuration.GetValue<int>("ReadingList:PageSize", 20);\r
\`\`\`\r
\r
### Sample 4\r
\r
\`\`\`csharp\r
if (builder.Environment.IsDevelopment())\r
{\r
    app.UseDeveloperExceptionPage();\r
}\r
\`\`\`\r
\r
### Sample 5\r
\r
\`\`\`bash\r
dotnet user-secrets init\r
dotnet user-secrets set "ConnectionStrings:ReadingList" "replace-with-a-local-value"\r
dotnet user-secrets list\r
\`\`\`\r
\r
## 4. Middleware and the request pipeline\r
\r
[Open chapter](04-middleware-and-request-pipeline.md)\r
\r
### Sample 1\r
\r
\`\`\`csharp\r
public sealed class RequestLogMiddleware\r
{\r
    private readonly RequestDelegate _next;\r
    private readonly ILogger<RequestLogMiddleware> _logger;\r
\r
    public RequestLogMiddleware(\r
        RequestDelegate next,\r
        ILogger<RequestLogMiddleware> logger)\r
    {\r
        _next = next;\r
        _logger = logger;\r
    }\r
\r
    public async Task InvokeAsync(HttpContext context)\r
    {\r
        var started = Stopwatch.StartNew();\r
        await _next(context);\r
        started.Stop();\r
\r
        _logger.LogInformation(\r
            "Handled {Method} {Path} with {StatusCode} in {ElapsedMs} ms",\r
            context.Request.Method,\r
            context.Request.Path,\r
            context.Response.StatusCode,\r
            started.ElapsedMilliseconds);\r
    }\r
}\r
\`\`\`\r
\r
### Sample 2\r
\r
\`\`\`csharp\r
app.UseMiddleware<RequestLogMiddleware>();\r
app.MapGet("/health", () => Results.Ok(new { status = "healthy" }));\r
\`\`\`\r
\r
### Sample 3\r
\r
\`\`\`csharp\r
app.UseExceptionHandler();\r
app.UseHttpsRedirection();\r
app.UseStaticFiles();\r
app.UseRouting();\r
app.UseCors("Frontend");\r
app.UseAuthentication();\r
app.UseAuthorization();\r
\r
app.MapControllers();\r
\`\`\`\r
\r
## 5. Routing and endpoint design\r
\r
[Open chapter](05-routing-and-endpoints.md)\r
\r
### Sample 1\r
\r
\`\`\`csharp\r
app.MapGet("/reading-items/{id:int}", (int id) =>\r
    Results.Ok(new { Id = id, Title = "Distributed systems notes" }));\r
\`\`\`\r
\r
### Sample 2\r
\r
\`\`\`csharp\r
var readingItems = app.MapGroup("/api/reading-items")\r
    .WithTags("Reading items");\r
\r
readingItems.MapGet("/", () =>\r
    Results.Ok(new[] { "Distributed systems notes", "HTTP notes" }));\r
\r
readingItems.MapGet("/{id:int}", (int id) =>\r
    Results.Ok(new { Id = id, Title = "Distributed systems notes" }));\r
\`\`\`\r
\r
### Sample 3\r
\r
\`\`\`csharp\r
app.MapGet("/api/reading-items/{id:int}", (int id) =>\r
        Results.Ok(new { Id = id }))\r
    .WithName("GetReadingItem");\r
\`\`\`\r
\r
## 6. Dependency injection, options, and logging\r
\r
[Open chapter](06-dependency-injection-options-and-logging.md)\r
\r
### Sample 1\r
\r
\`\`\`csharp\r
builder.Services.AddScoped<IReadingItemService, ReadingItemService>();\r
\`\`\`\r
\r
### Sample 2\r
\r
\`\`\`csharp\r
public sealed class ReadingItemService(IReadingItemStore store)\r
{\r
    public Task<IReadOnlyList<ReadingItem>> GetAllAsync(\r
        CancellationToken cancellationToken) =>\r
        store.GetAllAsync(cancellationToken);\r
}\r
\`\`\`\r
\r
### Sample 3\r
\r
\`\`\`csharp\r
public sealed class ReadingListOptions\r
{\r
    public const string SectionName = "ReadingList";\r
\r
    public int PageSize { get; set; } = 20;\r
}\r
\`\`\`\r
\r
### Sample 4\r
\r
\`\`\`csharp\r
builder.Services\r
    .AddOptions<ReadingListOptions>()\r
    .Bind(builder.Configuration.GetSection(ReadingListOptions.SectionName))\r
    .Validate(options => options.PageSize is > 0 and <= 100,\r
        "PageSize must be between 1 and 100.")\r
    .ValidateOnStart();\r
\`\`\`\r
\r
### Sample 5\r
\r
\`\`\`csharp\r
app.MapGet("/api/reading-items", (\r
    ILogger<Program> logger,\r
    IReadingItemService service,\r
    CancellationToken cancellationToken) =>\r
{\r
    logger.LogInformation("Reading the current item collection");\r
    return service.GetAllAsync(cancellationToken);\r
});\r
\`\`\`\r
\r
## 7. Minimal APIs\r
\r
[Open chapter](07-minimal-apis.md)\r
\r
### Sample 1\r
\r
\`\`\`csharp\r
using Microsoft.AspNetCore.Http.HttpResults;\r
\r
var builder = WebApplication.CreateBuilder(args);\r
builder.Services.AddOpenApi();\r
\r
var app = builder.Build();\r
var items = new List<ReadingItem>\r
{\r
    new(1, "HTTP fundamentals", false),\r
    new(2, "Dependency injection", true)\r
};\r
\r
var routes = app.MapGroup("/api/reading-items")\r
    .WithTags("Reading items");\r
\r
routes.MapGet("/", () => TypedResults.Ok(items));\r
\r
routes.MapGet("/{id:int}", (int id) => FindItem(id, items));\r
\r
routes.MapPost("/", (CreateReadingItem request) =>\r
{\r
    var item = new ReadingItem(\r
        items.Count == 0 ? 1 : items.Max(existing => existing.Id) + 1,\r
        request.Title,\r
        false);\r
\r
    items.Add(item);\r
    return TypedResults.Created($"/api/reading-items/{item.Id}", item);\r
});\r
\r
app.MapOpenApi();\r
app.Run();\r
\r
static Results<Ok<ReadingItem>, NotFound> FindItem(\r
    int id,\r
    List<ReadingItem> items)\r
{\r
    var item = items.SingleOrDefault(existing => existing.Id == id);\r
    if (item is null)\r
    {\r
        return TypedResults.NotFound();\r
    }\r
\r
    return TypedResults.Ok(item);\r
}\r
\r
public sealed record ReadingItem(int Id, string Title, bool IsRead);\r
public sealed record CreateReadingItem(string Title);\r
\`\`\`\r
\r
## 8. Controllers, REST, and OpenAPI\r
\r
[Open chapter](08-controllers-rest-and-openapi.md)\r
\r
### Sample 1\r
\r
\`\`\`csharp\r
builder.Services.AddControllers();\r
builder.Services.AddOpenApi();\r
\r
var app = builder.Build();\r
\r
app.MapOpenApi();\r
app.MapControllers();\r
\`\`\`\r
\r
### Sample 2\r
\r
\`\`\`csharp\r
[ApiController]\r
[Route("api/reading-items")]\r
public sealed class ReadingItemsController(\r
    IReadingItemService service) : ControllerBase\r
{\r
    [HttpGet]\r
    public async Task<ActionResult<IReadOnlyList<ReadingItem>>> GetAll(\r
        CancellationToken cancellationToken)\r
    {\r
        var items = await service.GetAllAsync(cancellationToken);\r
        return Ok(items);\r
    }\r
\r
    [HttpGet("{id:int}")]\r
    public async Task<ActionResult<ReadingItem>> GetById(\r
        int id,\r
        CancellationToken cancellationToken)\r
    {\r
        var item = await service.GetByIdAsync(id, cancellationToken);\r
        if (item is null)\r
        {\r
            return NotFound();\r
        }\r
\r
        return Ok(item);\r
    }\r
\r
    [HttpPost]\r
    public async Task<ActionResult<ReadingItem>> Create(\r
        CreateReadingItemRequest request,\r
        CancellationToken cancellationToken)\r
    {\r
        var item = await service.CreateAsync(\r
            request.Title,\r
            cancellationToken);\r
\r
        return CreatedAtAction(\r
            nameof(GetById),\r
            new { id = item.Id },\r
            item);\r
    }\r
}\r
\`\`\`\r
\r
### Sample 3\r
\r
\`\`\`csharp\r
public sealed record CreateReadingItemRequest(\r
    [Required, StringLength(120)] string Title);\r
\`\`\`\r
\r
## 9. Model binding, validation, and filters\r
\r
[Open chapter](09-model-binding-validation-and-filters.md)\r
\r
### Sample 1\r
\r
\`\`\`csharp\r
[HttpGet("search")]\r
public IActionResult Search(\r
    [FromQuery] string? term,\r
    [FromQuery] int page = 1)\r
{\r
    if (page < 1)\r
    {\r
        return BadRequest("Page must be positive.");\r
    }\r
\r
    return Ok(new { term, page });\r
}\r
\`\`\`\r
\r
### Sample 2\r
\r
\`\`\`csharp\r
public sealed class CreateReadingItemRequest\r
{\r
    [Required]\r
    [StringLength(120, MinimumLength = 2)]\r
    public string Title { get; set; } = string.Empty;\r
}\r
\`\`\`\r
\r
## 10. Razor Pages and MVC\r
\r
[Open chapter](10-razor-pages-and-mvc.md)\r
\r
### Sample 1\r
\r
\`\`\`html\r
@page\r
@model CreateModel\r
\r
<form method="post">\r
    <label asp-for="Input.Title"></label>\r
    <input asp-for="Input.Title" />\r
    <span asp-validation-for="Input.Title"></span>\r
    <button type="submit">Add item</button>\r
</form>\r
\`\`\`\r
\r
### Sample 2\r
\r
\`\`\`cshtml\r
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers\r
\`\`\`\r
\r
### Sample 3\r
\r
\`\`\`csharp\r
public sealed class CreateModel(IReadingItemService service) : PageModel\r
{\r
    [BindProperty]\r
    public CreateReadingItemRequest Input { get; set; } = new();\r
\r
    public async Task<IActionResult> OnPostAsync(\r
        CancellationToken cancellationToken)\r
    {\r
        if (!ModelState.IsValid)\r
        {\r
            return Page();\r
        }\r
\r
        await service.CreateAsync(Input.Title, cancellationToken);\r
        return RedirectToPage("Index");\r
    }\r
}\r
\`\`\`\r
\r
### Sample 4\r
\r
\`\`\`csharp\r
public sealed class ReadingItemsController(\r
    IReadingItemService service) : Controller\r
{\r
    public async Task<IActionResult> Index(\r
        CancellationToken cancellationToken)\r
    {\r
        var items = await service.GetAllAsync(cancellationToken);\r
        return View(items);\r
    }\r
}\r
\`\`\`\r
\r
## 11. Blazor Web Apps\r
\r
[Open chapter](11-blazor-web-apps.md)\r
\r
### Sample 1\r
\r
\`\`\`csharp\r
builder.Services\r
    .AddRazorComponents()\r
    .AddInteractiveServerComponents();\r
\r
var app = builder.Build();\r
\r
app.MapRazorComponents<App>()\r
    .AddInteractiveServerRenderMode();\r
\`\`\`\r
\r
### Sample 2\r
\r
\`\`\`razor\r
@page "/counter"\r
@rendermode InteractiveServer\r
\r
<PageTitle>Counter</PageTitle>\r
\r
<h1>Reading list counter</h1>\r
<p>Items added: @count</p>\r
<button @onclick="AddOne">Add one</button>\r
\r
@code {\r
    private int count;\r
\r
    private void AddOne()\r
    {\r
        count++;\r
    }\r
}\r
\`\`\`\r
\r
## 12. Data access with Entity Framework Core\r
\r
[Open chapter](12-data-access-with-ef-core.md)\r
\r
### Sample 1\r
\r
\`\`\`csharp\r
public sealed class ReadingDbContext(\r
    DbContextOptions<ReadingDbContext> options) : DbContext(options)\r
{\r
    public DbSet<ReadingItem> ReadingItems => Set<ReadingItem>();\r
}\r
\r
public sealed class ReadingItem\r
{\r
    public int Id { get; set; }\r
    public string Title { get; set; } = string.Empty;\r
    public bool IsRead { get; set; }\r
}\r
\`\`\`\r
\r
### Sample 2\r
\r
\`\`\`csharp\r
var connectionString =\r
    builder.Configuration.GetConnectionString("ReadingList");\r
\r
builder.Services.AddDbContext<ReadingDbContext>(options =>\r
    options.UseSqlite(connectionString));\r
\`\`\`\r
\r
### Sample 3\r
\r
\`\`\`csharp\r
public sealed record ReadingItemResponse(int Id, string Title, bool IsRead);\r
\`\`\`\r
\r
### Sample 4\r
\r
\`\`\`csharp\r
app.MapGet("/api/reading-items", async (\r
    ReadingDbContext db,\r
    CancellationToken cancellationToken) =>\r
{\r
    var items = await db.ReadingItems\r
        .AsNoTracking()\r
        .OrderBy(item => item.Title)\r
        .Select(item => new ReadingItemResponse(\r
            item.Id,\r
            item.Title,\r
            item.IsRead))\r
        .ToListAsync(cancellationToken);\r
\r
    return TypedResults.Ok(items);\r
});\r
\`\`\`\r
\r
### Sample 5\r
\r
\`\`\`csharp\r
app.MapPost("/api/reading-items", async (\r
    CreateReadingItemRequest request,\r
    ReadingDbContext db,\r
    CancellationToken cancellationToken) =>\r
{\r
    var item = new ReadingItem { Title = request.Title };\r
    db.ReadingItems.Add(item);\r
    await db.SaveChangesAsync(cancellationToken);\r
\r
    var response = new ReadingItemResponse(\r
        item.Id,\r
        item.Title,\r
        item.IsRead);\r
\r
    return TypedResults.Created(\r
        $"/api/reading-items/{item.Id}",\r
        response);\r
});\r
\`\`\`\r
\r
### Sample 6\r
\r
\`\`\`bash\r
dotnet tool install --global dotnet-ef\r
dotnet add package Microsoft.EntityFrameworkCore.Design\r
dotnet ef migrations add InitialCreate\r
dotnet ef database update\r
\`\`\`\r
\r
## 13. Authentication, Identity, and cookies\r
\r
[Open chapter](13-authentication-identity-and-cookies.md)\r
\r
### Sample 1\r
\r
\`\`\`csharp\r
builder.Services\r
    .AddDefaultIdentity<IdentityUser>(options =>\r
    {\r
        options.SignIn.RequireConfirmedAccount = true;\r
        options.Password.RequiredLength = 12;\r
    })\r
    .AddEntityFrameworkStores<ApplicationDbContext>();\r
\`\`\`\r
\r
### Sample 2\r
\r
\`\`\`csharp\r
app.UseAuthentication();\r
app.UseAuthorization();\r
\`\`\`\r
\r
## 14. Authorization and web security\r
\r
[Open chapter](14-authorization-and-web-security.md)\r
\r
### Sample 1\r
\r
\`\`\`csharp\r
builder.Services.AddAuthorizationBuilder()\r
    .AddPolicy("ReadingItemEditor", policy =>\r
        policy.RequireRole("Editor"));\r
\`\`\`\r
\r
### Sample 2\r
\r
\`\`\`csharp\r
builder.Services.AddCors(options =>\r
{\r
    options.AddPolicy("Frontend", policy =>\r
        policy.WithOrigins("https://app.example.com")\r
            .AllowAnyHeader()\r
            .AllowAnyMethod());\r
});\r
\r
var app = builder.Build();\r
\r
app.UseRouting();\r
app.UseCors("Frontend");\r
app.UseAuthentication();\r
app.UseAuthorization();\r
\`\`\`\r
\r
## 15. Error handling, Problem Details, and diagnostics\r
\r
[Open chapter](15-errors-problem-details-and-diagnostics.md)\r
\r
### Sample 1\r
\r
\`\`\`csharp\r
builder.Services.AddProblemDetails();\r
\r
var app = builder.Build();\r
\r
if (app.Environment.IsDevelopment())\r
{\r
    app.UseDeveloperExceptionPage();\r
}\r
else\r
{\r
    app.UseExceptionHandler();\r
    app.UseHsts();\r
}\r
\r
app.UseStatusCodePages();\r
\`\`\`\r
\r
### Sample 2\r
\r
\`\`\`csharp\r
app.MapGet("/api/reading-items/{id:int}", (int id) => GetReadingItem(id));\r
\r
static IResult GetReadingItem(int id)\r
{\r
    if (id < 1)\r
    {\r
        return Results.Problem(\r
            title: "Invalid reading item identifier",\r
            statusCode: StatusCodes.Status400BadRequest);\r
    }\r
\r
    return Results.Ok(new { Id = id, Title = "HTTP fundamentals" });\r
}\r
\`\`\`\r
\r
## 16. Static files, uploads, and downloads\r
\r
[Open chapter](16-static-files-uploads-and-downloads.md)\r
\r
### Sample 1\r
\r
\`\`\`csharp\r
app.UseStaticFiles();\r
\`\`\`\r
\r
### Sample 2\r
\r
\`\`\`csharp\r
[HttpPost("uploads")]\r
[RequestSizeLimit(5_000_000)]\r
public async Task<IActionResult> Upload(\r
    IFormFile file,\r
    CancellationToken cancellationToken)\r
{\r
    if (file.Length == 0)\r
    {\r
        return BadRequest("Choose a non-empty file.");\r
    }\r
\r
    var extension = Path.GetExtension(file.FileName);\r
    var allowedExtensions = new HashSet<string>(\r
        StringComparer.OrdinalIgnoreCase)\r
    {\r
        ".pdf",\r
        ".txt"\r
    };\r
\r
    if (!allowedExtensions.Contains(extension))\r
    {\r
        return BadRequest("File type is not allowed.");\r
    }\r
\r
    var storedName = $"{Guid.NewGuid():N}{extension}";\r
    var path = Path.Combine(_uploadDirectory, storedName);\r
\r
    await using var stream = System.IO.File.Create(path);\r
    await file.CopyToAsync(stream, cancellationToken);\r
\r
    return Ok(new { storedName });\r
}\r
\`\`\`\r
\r
### Sample 3\r
\r
\`\`\`csharp\r
return PhysicalFile(\r
    storedPath,\r
    "application/pdf",\r
    downloadName: "reading-notes.pdf",\r
    enableRangeProcessing: true);\r
\`\`\`\r
\r
## 17. SignalR and gRPC\r
\r
[Open chapter](17-signalr-and-grpc.md)\r
\r
### Sample 1\r
\r
\`\`\`csharp\r
builder.Services.AddSignalR();\r
\r
var app = builder.Build();\r
\r
app.MapHub<ReadingListHub>("/hubs/reading-list");\r
\r
public sealed class ReadingListHub : Hub\r
{\r
    public Task JoinList(string listId)\r
    {\r
        return Groups.AddToGroupAsync(\r
            Context.ConnectionId,\r
            $"list-{listId}");\r
    }\r
}\r
\`\`\`\r
\r
### Sample 2\r
\r
\`\`\`proto\r
syntax = "proto3";\r
\r
package readinglist;\r
\r
service ReadingList {\r
  rpc GetItem (GetItemRequest) returns (ReadingItemReply);\r
}\r
\r
message GetItemRequest {\r
  int32 id = 1;\r
}\r
\r
message ReadingItemReply {\r
  int32 id = 1;\r
  string title = 2;\r
  bool is_read = 3;\r
}\r
\`\`\`\r
\r
## 18. Testing ASP.NET Core apps\r
\r
[Open chapter](18-testing-aspnet-core-apps.md)\r
\r
### Sample 1\r
\r
\`\`\`csharp\r
public partial class Program { }\r
\`\`\`\r
\r
### Sample 2\r
\r
\`\`\`csharp\r
public sealed class HealthEndpointTests(\r
    WebApplicationFactory<Program> factory)\r
    : IClassFixture<WebApplicationFactory<Program>>\r
{\r
    private readonly HttpClient _client = factory.CreateClient();\r
\r
    [Fact]\r
    public async Task Health_returns_success()\r
    {\r
        var response = await _client.GetAsync("/health");\r
\r
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);\r
    }\r
}\r
\`\`\`\r
\r
### Sample 3\r
\r
\`\`\`bash\r
dotnet test\r
dotnet test --filter FullyQualifiedName~HealthEndpointTests\r
\`\`\`\r
\r
## 19. Performance, health checks, and deployment\r
\r
[Open chapter](19-performance-health-and-deployment.md)\r
\r
### Sample 1\r
\r
\`\`\`csharp\r
builder.Services.AddHealthChecks();\r
\r
var app = builder.Build();\r
\r
app.MapHealthChecks("/health/live");\r
\`\`\`\r
\r
### Sample 2\r
\r
\`\`\`bash\r
dotnet restore\r
dotnet test\r
dotnet publish -c Release -o ./publish\r
\`\`\`\r
`,"./chapters/99-complete-q-and-a.md":`[Back to notes index](../README.md)\r
\r
| [Previous: All code samples](98-all-code-samples.md) | [Notes index](../README.md) | Next: End |\r
| --- | --- | --- |\r
\r
# 99. Complete questions and answers\r
\r
These questions review the core ideas from the chapters. Use them to check whether you can explain the reason behind a framework feature, not only remember its name.\r
\r
## 1. ASP.NET Core and HTTP basics\r
\r
**1. What is ASP.NET Core?**  \r
ASP.NET Core is the web framework in .NET for handling HTTP requests and building APIs, server-rendered pages, and interactive web apps.\r
\r
**2. What is the difference between a request and a response?**  \r
A request comes from a client and includes a method, path, headers, and sometimes a body. The server returns a response with a status code, headers, and an optional body.\r
\r
**3. What does middleware do?**  \r
Middleware runs in the request pipeline. It can inspect a request, call the next component, change the response, or stop processing with its own response.\r
\r
**4. When should an API return 401, 403, and 404?**  \r
Use 401 when authentication is missing or invalid, 403 when the caller is authenticated but not allowed, and 404 when the requested resource does not exist or should not be disclosed.\r
\r
## 2. .NET setup and project structure\r
\r
**5. What is the difference between the .NET SDK and runtime?**  \r
The SDK includes the compiler and build tools. The runtime executes compiled applications.\r
\r
**6. Which template should start a small API?**  \r
The webapi template is a good starting point. It uses Minimal APIs by default in current SDKs. The controller option creates a controller-based API shape.\r
\r
**7. What does the target framework in a project file control?**  \r
It identifies the .NET API surface and runtime target used to build the project. It does not pin a specific monthly security patch.\r
\r
**8. Why should bin and obj normally stay out of Git?**  \r
They contain generated build and restore output. The SDK recreates them, so source control should keep the project inputs instead.\r
\r
## 3. Hosting, environments, and configuration\r
\r
**9. What does WebApplication.CreateBuilder provide?**  \r
It creates the host builder with common configuration, logging, dependency injection, and web hosting defaults.\r
\r
**10. What is the purpose of Development and Production environments?**  \r
They let the app choose safe environment-specific behavior and settings. Development can show detailed diagnostics, while Production should return safe errors.\r
\r
**11. How do configuration providers override each other?**  \r
Providers are added in an order. A later provider generally wins when it supplies the same key, so environment variables and command-line values can override JSON defaults.\r
\r
**12. Are user secrets suitable for production credentials?**  \r
No. They are a local development convenience that keeps values out of the project tree. Production secrets belong in a protected secret store or hosting configuration.\r
\r
## 4. Middleware and the request pipeline\r
\r
**13. Why does middleware order matter?**  \r
Each component sees requests in registration order and responses on the way back out. A component placed too late may not see failures or may prevent later processing.\r
\r
**14. What is the difference between Use, Run, and Map?**  \r
Use adds middleware that can call the next component. Run adds a terminal delegate. Map branches processing based on a path prefix.\r
\r
**15. Where should exception handling usually be registered?**  \r
Near the start of the pipeline so it can handle exceptions from downstream middleware and endpoints.\r
\r
**16. Why should response headers be set before the response starts?**  \r
Once the server has sent response headers or body bytes, those headers cannot be changed reliably.\r
\r
## 5. Routing and endpoint design\r
\r
**17. When should an identifier be in the route instead of the query string?**  \r
A path segment commonly identifies one resource. Query values are useful for optional filters, sorting, and paging.\r
\r
**18. Does an integer route constraint validate all business rules?**  \r
No. It checks whether the route segment matches the expected shape. The app still checks ranges, existence, ownership, and other rules.\r
\r
**19. What is a route group useful for?**  \r
It shares a path prefix and endpoint metadata such as tags, authorization, and filters across related endpoints.\r
\r
**20. Should database table names determine public URLs?**  \r
Usually not. Public routes should describe the resource contract and remain stable even if the database schema changes.\r
\r
## 6. Dependency injection, options, and logging\r
\r
**21. Why use dependency injection?**  \r
It makes a class's dependencies visible and lets the application provide the appropriate implementation and lifetime.\r
\r
**22. When should a service be scoped?**  \r
Use a scoped lifetime for work that belongs to one request, including the usual Entity Framework Core DbContext lifetime.\r
\r
**23. Why is injecting a scoped service into a singleton unsafe?**  \r
The singleton can retain a request-scoped object beyond the request that created it. This causes incorrect lifetime behavior and can expose request data across users.\r
\r
**24. Why validate options at startup?**  \r
It makes invalid configuration fail early with a useful message instead of failing later during a request.\r
\r
## 7. Minimal APIs\r
\r
**25. What are Minimal APIs?**  \r
They are route-mapped HTTP handlers with direct access to request values and registered services. They can still use validation, filters, authorization, OpenAPI, and application services.\r
\r
**26. When are Minimal APIs a good fit?**  \r
They work well for focused APIs and smaller services where concise endpoint mapping keeps the behavior clear.\r
\r
**27. Why use typed results?**  \r
Typed results make response shapes more explicit and help tools describe the endpoint contract.\r
\r
**28. Why is an in-memory list unsuitable for durable application data?**  \r
It disappears when the process restarts, is local to one instance, and needs careful concurrency handling.\r
\r
## 8. Controllers, REST, and OpenAPI\r
\r
**29. What does ApiController add?**  \r
It applies API conventions such as automatic validation responses and clearer binding behavior for controller actions.\r
\r
**30. Why use request DTOs instead of binding database entities?**  \r
A DTO defines exactly which fields the client may submit and avoids exposing internal persistence fields.\r
\r
**31. What does CreatedAtAction communicate?**  \r
It returns a successful creation response with a location that points to the new resource.\r
\r
**32. What is OpenAPI?**  \r
It is a machine-readable description of API routes, inputs, and responses. A visual API browser is a separate presentation tool.\r
\r
## 9. Model binding, validation, and filters\r
\r
**33. What does model binding do?**  \r
It converts request route values, query values, form values, headers, or body data into method parameters and objects.\r
\r
**34. Is client-side validation enough?**  \r
No. Clients can bypass browser code, so the server validates every input before using it.\r
\r
**35. What should basic DTO validation check?**  \r
It can check required values, length, format, and simple ranges. Rules that depend on database state belong in application logic.\r
\r
**36. When is a filter a better fit than middleware?**  \r
A filter is useful for behavior tied to MVC actions or endpoint execution. Middleware is broader and applies across the request pipeline.\r
\r
## 10. Razor Pages and MVC\r
\r
**37. How do Razor Pages and MVC differ?**  \r
Razor Pages organizes handlers around pages. MVC organizes request handling around controllers and views. Both use the same ASP.NET Core host and services.\r
\r
**38. What is the post-redirect-get pattern?**  \r
After a successful form post, the server redirects to a GET page. Refreshing that page will not resubmit the original form.\r
\r
**39. Why should a form show server validation messages?**  \r
The server is the trusted validation boundary, and the user needs clear feedback when submitted data is rejected.\r
\r
**40. Is Razor syntax the same as Blazor?**  \r
No. Razor is a syntax used by several ASP.NET Core technologies. Razor Pages and MVC render HTML on the server, while Blazor uses components and render modes.\r
\r
## 11. Blazor Web Apps\r
\r
**41. What is a Blazor component?**  \r
It is a reusable UI unit that combines markup, parameters, state, and event handling.\r
\r
**42. What is a render mode?**  \r
It selects how a component is rendered and whether it becomes interactive on the server, in WebAssembly, or through another supported mode.\r
\r
**43. Where does Interactive Server state live?**  \r
It lives in a server-side circuit while that connection is active. Important state must be saved in durable application storage.\r
\r
**44. Can WebAssembly code contain a server secret?**  \r
No. Browser-delivered code and values can be inspected by the user. Keep trusted credentials and authorization decisions on the server.\r
\r
## 12. Data access with Entity Framework Core\r
\r
**45. What does DbContext represent?**  \r
It represents a unit of work that tracks entity changes and coordinates queries and saves for a database session.\r
\r
**46. Why is DbContext usually scoped in a web app?**  \r
A request can use one context for its data work without sharing mutable tracking state across concurrent requests.\r
\r
**47. When should AsNoTracking be used?**  \r
Use it for read-only queries where the returned entities will not be updated through that context.\r
\r
**48. What is an EF Core migration?**  \r
It is a versioned description of a database schema change. Review it and plan how it will be applied in each environment.\r
\r
## 13. Authentication, Identity, and cookies\r
\r
**49. What does authentication answer?**  \r
It establishes who is making a request.\r
\r
**50. What does ASP.NET Core Identity provide?**  \r
It provides account management features such as user storage, password hashing, sign-in, roles, and account tokens.\r
\r
**51. What does a protected authentication cookie contain?**  \r
It carries protected authentication ticket data that the server uses to restore the user's identity on later requests.\r
\r
**52. When are bearer tokens common?**  \r
They are common for APIs called by separate clients that present tokens issued by a trusted identity provider.\r
\r
## 14. Authorization and web security\r
\r
**53. What does authorization answer?**  \r
It decides whether an identity may perform an operation or access a resource.\r
\r
**54. Is CORS an access control system for APIs?**  \r
No. CORS controls what browser scripts may read across origins. The API still needs authentication and authorization.\r
\r
**55. What is resource-based authorization?**  \r
It checks access using the specific object, such as whether the current user owns a particular reading item.\r
\r
**56. Why do cookie-authenticated forms need antiforgery protection?**  \r
Browsers send cookies automatically. An attacker may try to make a signed-in browser submit an unwanted state-changing request.\r
\r
## 15. Error handling, Problem Details, and diagnostics\r
\r
**57. What should a production error response avoid?**  \r
It should avoid stack traces, file paths, secret values, and internal implementation details.\r
\r
**58. What is Problem Details used for?**  \r
It provides a consistent response structure for HTTP errors so clients can inspect a status, title, and other safe details.\r
\r
**59. Should a missing database record be thrown as an exception?**  \r
Usually not. A normal missing-resource outcome should be represented as a 404 response.\r
\r
**60. What makes a log structured?**  \r
It records named values separately from the message template, which makes the event easier to search and aggregate.\r
\r
## 16. Static files, uploads, and downloads\r
\r
**61. What belongs under wwwroot?**  \r
Public files that the app may serve directly, such as public stylesheets, scripts, and images.\r
\r
**62. Why generate a server-side upload file name?**  \r
It avoids trusting user-controlled path text and reduces collisions and path traversal risk.\r
\r
**63. Does a file extension prove a file is safe?**  \r
No. The extension and content type are supplied or influenced by the client. Validate content and apply size and storage rules.\r
\r
**64. How should private downloads be served?**  \r
Look up the file by an application identifier, check the user's access to its record, and return a server-selected storage path.\r
\r
## 17. SignalR and gRPC\r
\r
**65. When is SignalR useful?**  \r
It is useful when connected clients need server push, live updates, or two-way messages.\r
\r
**66. What is a SignalR group?**  \r
It is a set of connections that can receive the same server message. Membership must be authorized, not inferred from a group name.\r
\r
**67. What does gRPC use for service contracts?**  \r
It commonly uses Protocol Buffers definitions to generate typed client and server code.\r
\r
**68. Which should a browser use, SignalR or gRPC?**  \r
Choose based on the interaction. SignalR supports live messages; browser gRPC may need gRPC-Web or an HTTP API depending on the environment.\r
\r
## 18. Testing ASP.NET Core apps\r
\r
**69. What is the difference between a unit test and an integration test?**  \r
A unit test isolates one rule or class. An integration test runs several components together, often through the HTTP pipeline.\r
\r
**70. What does WebApplicationFactory provide?**  \r
It starts an ASP.NET Core app in a test host and provides an HttpClient for in-process HTTP requests.\r
\r
**71. Why is EF Core InMemory not a substitute for a relational database?**  \r
Its query and transaction behavior differs from relational providers, so it cannot prove that SQL behavior is correct.\r
\r
**72. What should an API integration test assert?**  \r
Check the status, response contract, and important side effects, including meaningful error and authorization behavior.\r
\r
## 19. Performance, health checks, and deployment\r
\r
**73. Why measure before optimizing?**  \r
Measurement identifies the actual bottleneck and provides a way to check whether a change helped.\r
\r
**74. What is the difference between liveness and readiness?**  \r
Liveness asks whether the process should keep running. Readiness asks whether it can safely receive traffic, including required dependencies.\r
\r
**75. Why can in-memory cache behave differently after scaling out?**  \r
Each application instance has a separate cache. A change made in one process does not automatically appear in another.\r
\r
**76. What are forwarded headers for?**  \r
A trusted reverse proxy can pass the original client address and request scheme. The app must trust only known proxies or networks.\r
\r
**77. What does dotnet publish create?**  \r
It produces application files for deployment. Framework-dependent output uses an installed runtime; self-contained output includes a runtime for a selected platform.\r
\r
**78. Why keep a .NET app on current patches?**  \r
Supported patches include servicing fixes. Microsoft support policy requires staying current within a supported release.\r
\r
## Quick review\r
\r
Before building or deploying a feature, ask:\r
\r
- What request and response contract does it use?\r
- Where should validation, business rules, and authorization live?\r
- Which service lifetime matches the work?\r
- What does the user see when the resource is missing or input is invalid?\r
- How will this behavior be tested and monitored?\r
- Which official documentation page applies to the target framework version?\r
`})).map(([e,t])=>{let n=e.split(`/`).at(-1);return{content:t,fileName:n,number:Number(n.match(/^\d+/)?.[0]??0),slug:n.replace(/^\d+-/,``).replace(/\.md$/i,``),title:(t.match(/^#\s+(.+)$/m)?.[1]??n).replace(/^\d+\.\s*/,``)}}).sort((e,t)=>e.number-t.number),h=`/notes/asp-net-notes`,g=new Map(m.map(e=>[e.fileName,e]));function _({href:e=``,children:n,...r}){let{node:i,...a}=r,[o,s]=e.split(`#`),c=o.split(`/`).at(-1),l=g.get(c),u=s?`#${s}`:``;if(/^README\.md$/i.test(c))return(0,p.createElement)(t,{to:`${h}${u}`,...a},n);if(l)return(0,p.createElement)(t,{to:`${h}/${l.slug}${u}`,...a},n);let d=/^(https?:|mailto:|tel:)/i.test(e);return(0,p.createElement)(`a`,{href:e,target:d?`_blank`:void 0,rel:d?`noopener noreferrer`:void 0,...a},n)}var v={a:_},y=`# ASP.NET Core Study Notes\r
\r
These are my personal study notes on ASP.NET Core, written while studying .NET web development and working through practical examples. They keep the framework concepts, useful code patterns, and questions I want to revisit in one place.\r
\r
## Scope and version\r
\r
The notes focus on modern ASP.NET Core with .NET 10 and C#. ASP.NET Core is the cross-platform web framework in .NET. It is different from classic ASP.NET on .NET Framework, which is outside the main scope of these notes.\r
\r
The chapters cover HTTP, hosting, configuration, middleware, routing, dependency injection, APIs, server-rendered pages, Blazor, data access, security, testing, and deployment. The examples use a small reading-list service to connect related topics where that makes sense.\r
\r
.NET 10 is an active long-term support release as of October 2026. Install current patches and check the official support policy when selecting a runtime for a project.\r
\r
## Core topics\r
\r
1. [ASP.NET Core and HTTP basics](chapters/01-aspnet-core-and-http.md)\r
2. [.NET setup and project structure](chapters/02-dotnet-setup-and-project-structure.md)\r
3. [Hosting, environments, and configuration](chapters/03-hosting-environments-and-configuration.md)\r
4. [Middleware and the request pipeline](chapters/04-middleware-and-request-pipeline.md)\r
5. [Routing and endpoint design](chapters/05-routing-and-endpoints.md)\r
6. [Dependency injection, options, and logging](chapters/06-dependency-injection-options-and-logging.md)\r
7. [Minimal APIs](chapters/07-minimal-apis.md)\r
8. [Controllers, REST, and OpenAPI](chapters/08-controllers-rest-and-openapi.md)\r
9. [Model binding, validation, and filters](chapters/09-model-binding-validation-and-filters.md)\r
10. [Razor Pages and MVC](chapters/10-razor-pages-and-mvc.md)\r
11. [Blazor Web Apps](chapters/11-blazor-web-apps.md)\r
12. [Data access with Entity Framework Core](chapters/12-data-access-with-ef-core.md)\r
13. [Authentication, Identity, and cookies](chapters/13-authentication-identity-and-cookies.md)\r
14. [Authorization and web security](chapters/14-authorization-and-web-security.md)\r
15. [Error handling, Problem Details, and diagnostics](chapters/15-errors-problem-details-and-diagnostics.md)\r
16. [Static files, uploads, and downloads](chapters/16-static-files-uploads-and-downloads.md)\r
17. [SignalR and gRPC](chapters/17-signalr-and-grpc.md)\r
18. [Testing ASP.NET Core apps](chapters/18-testing-aspnet-core-apps.md)\r
19. [Performance, health checks, and deployment](chapters/19-performance-health-and-deployment.md)\r
20. [All code samples](chapters/98-all-code-samples.md)\r
21. [Complete questions and answers](chapters/99-complete-q-and-a.md)\r
\r
## How to use these notes\r
\r
Read the chapters in order. The examples start with HTTP and the app entry point, then build toward APIs, user interfaces, data access, and production concerns. Each chapter records the idea behind a feature, the relevant ASP.NET Core APIs, and practical C# examples. The last two chapters gather the code and review questions for a quick revisit.\r
\r
These are personal learning notes. I update them as I study the framework, test examples, and use the concepts in projects.\r
\r
## Official references\r
\r
- [ASP.NET Core overview](https://learn.microsoft.com/aspnet/core/overview?view=aspnetcore-10.0)\r
- [ASP.NET Core fundamentals](https://learn.microsoft.com/aspnet/core/fundamentals/?view=aspnetcore-10.0)\r
- [.NET support policy](https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core)\r
- [C# documentation](https://learn.microsoft.com/dotnet/csharp/)\r
- [Entity Framework Core documentation](https://learn.microsoft.com/ef/core/)\r
- [What's new in ASP.NET Core 10](https://learn.microsoft.com/aspnet/core/release-notes/aspnetcore-10.0?view=aspnetcore-10.0)\r
\r
## Links\r
\r
- Portfolio: [ashishranjan.net](https://www.ashishranjan.net)\r
- GitHub: [github.com/a2rp](https://github.com/a2rp)\r
- CodePen: [codepen.io/ash1198](https://codepen.io/ash1198)\r
- LinkedIn: [linkedin.com/in/aashishranjan](https://www.linkedin.com/in/aashishranjan)\r
- Facebook: [facebook.com/theash.ashish](https://www.facebook.com/theash.ashish/)\r
- YouTube: [Ashish Ranjan](https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1)\r
- Email: [ash.ranjan09@gmail.com](mailto:ash.ranjan09@gmail.com)\r
\r
## Support\r
\r
- [Support](https://a2rp-donation-page.netlify.app/)\r
- [Buy Me a Coffee](https://buymeacoffee.com/ashishranjan)\r
- [Patreon](https://www.patreon.com/ashishranjan)\r
`,b={layout:`_layout_1umis_1`,projectHeader:`_projectHeader_1umis_10`,backLink:`_backLink_1umis_27`,projectIdentity:`_projectIdentity_1umis_41`,eyebrow:`_eyebrow_1umis_44`,chapterCount:`_chapterCount_1umis_71`,body:`_body_1umis_83`,sidebar:`_sidebar_1umis_94`,sidebarHeading:`_sidebarHeading_1umis_107`,navigation:`_navigation_1umis_126`,navLink:`_navLink_1umis_141`,active:`_active_1umis_164`,navNumber:`_navNumber_1umis_166`,content:`_content_1umis_177`,chapterHeading:`_chapterHeading_1umis_180`,markdown:`_markdown_1umis_203`,missingChapter:`_missingChapter_1umis_245`,chapterNavigation:`_chapterNavigation_1umis_256`,referenceLink:`_referenceLink_1umis_283`},x=r(),S=`/notes/asp-net-notes`;function C(){let{chapterSlug:e}=u(),{pathname:r}=i(),a=(0,p.useRef)(null),h=m.findIndex(t=>t.slug===e),g=h>=0?m[h]:null,_=e?g?.content:y;return(0,p.useEffect)(()=>{a.current?.querySelector(`[aria-current="page"]`)?.scrollIntoView({behavior:`smooth`,block:`nearest`})},[r]),(0,x.jsxs)(`div`,{className:b.layout,children:[(0,x.jsxs)(`header`,{className:b.projectHeader,children:[(0,x.jsxs)(t,{className:b.backLink,to:`/notes`,children:[(0,x.jsx)(c,{"aria-hidden":`true`}),` All notes`]}),(0,x.jsxs)(`div`,{className:b.projectIdentity,children:[(0,x.jsxs)(`span`,{className:b.eyebrow,children:[(0,x.jsx)(s,{"aria-hidden":`true`}),` ASP.NET CORE AND C#`]}),(0,x.jsx)(`h1`,{children:`ASP.NET Core Notes`}),(0,x.jsx)(`p`,{children:`Practical SQL, Java APIs, and operations notes for ASP.NET Core.`})]}),(0,x.jsxs)(`span`,{className:b.chapterCount,children:[m.length,` sections`]})]}),(0,x.jsxs)(`div`,{className:b.body,children:[(0,x.jsxs)(`aside`,{className:b.sidebar,children:[(0,x.jsxs)(`div`,{className:b.sidebarHeading,children:[(0,x.jsx)(`span`,{children:`CONTENTS`}),(0,x.jsx)(`strong`,{children:`ASP.NET Core study guide`})]}),(0,x.jsxs)(`nav`,{ref:a,className:b.navigation,"aria-label":`ASP.NET Core notes chapters`,children:[(0,x.jsxs)(n,{to:S,end:!0,className:({isActive:e})=>`${b.navLink} ${e?b.active:``}`,children:[(0,x.jsx)(s,{"aria-hidden":`true`}),(0,x.jsx)(`span`,{children:`Overview`})]}),m.map(e=>(0,x.jsxs)(n,{to:`${S}/${e.slug}`,className:({isActive:e})=>`${b.navLink} ${e?b.active:``}`,children:[(0,x.jsx)(`span`,{className:b.navNumber,children:String(e.number).padStart(2,`0`)}),(0,x.jsx)(`span`,{children:e.title})]},e.slug))]})]}),(0,x.jsxs)(`main`,{className:b.content,children:[g&&(0,x.jsxs)(`div`,{className:b.chapterHeading,children:[(0,x.jsxs)(`span`,{children:[(0,x.jsx)(l,{"aria-hidden":`true`}),` CHAPTER `,String(g.number).padStart(2,`0`)]}),(0,x.jsx)(`h2`,{children:g.title})]}),_?(0,x.jsx)(`article`,{className:b.markdown,children:(0,x.jsx)(d,{remarkPlugins:[f],components:v,children:_})}):(0,x.jsxs)(`section`,{className:b.missingChapter,children:[(0,x.jsx)(`span`,{children:`CHAPTER NOT FOUND`}),(0,x.jsx)(`h2`,{children:`This ASP.NET Core notes chapter is unavailable.`}),(0,x.jsxs)(t,{to:S,children:[`Back to the ASP.NET Core notes index `,(0,x.jsx)(o,{"aria-hidden":`true`})]})]}),g&&(0,x.jsxs)(`nav`,{className:b.chapterNavigation,"aria-label":`Previous and next chapters`,children:[(0,x.jsxs)(t,{to:h===0?S:`${S}/${m[h-1].slug}`,children:[(0,x.jsx)(c,{"aria-hidden":`true`}),(0,x.jsx)(`span`,{children:h===0?`Notes index`:m[h-1].title})]}),h<m.length-1&&(0,x.jsxs)(t,{to:`${S}/${m[h+1].slug}`,children:[(0,x.jsx)(`span`,{children:m[h+1].title}),(0,x.jsx)(o,{"aria-hidden":`true`})]})]})]})]}),(0,x.jsxs)(`a`,{className:b.referenceLink,href:`https://learn.microsoft.com/aspnet/core/?view=aspnetcore-10.0`,target:`_blank`,rel:`noopener noreferrer`,children:[`Official ASP.NET Core Manuals `,(0,x.jsx)(o,{"aria-hidden":`true`})]})]})}export{C as default};