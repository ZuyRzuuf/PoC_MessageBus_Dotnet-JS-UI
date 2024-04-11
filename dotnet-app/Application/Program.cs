using Application;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<MessengerOptions>(builder.Configuration.GetSection("MessagingSystem"));

// Add services to the container.
builder.Services.AddSingleton<IMessageProducerFactory, MessageProducerFactory>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapPost("/kafka", async (
    [FromBody] MessageModel message, [FromServices] IMessageProducerFactory factory, CancellationToken cancellationToken) =>
{
    var producer = factory.CreateProducer("Kafka");
    var deliveryStatus = await producer.SendMessageAsync(message, cancellationToken);
    
    return Results.Ok(deliveryStatus);
});

app.MapPost("/redpanda", async (
    [FromBody] MessageModel message, [FromServices] IMessageProducerFactory factory, CancellationToken cancellationToken) =>
{
    var producer = factory.CreateProducer("RedPanda");
    var deliveryStatus = await producer.SendMessageAsync(message, cancellationToken);
    
    return Results.Ok(deliveryStatus);
});

app.Run();
