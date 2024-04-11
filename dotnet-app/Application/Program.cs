using Application;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<MessengerOptions>(builder.Configuration.GetSection("MessagingSystem"));
builder.Services.Configure<ConsumerOptions>("Kafka", builder.Configuration.GetSection("MessagingSystem:Kafka"));
builder.Services.Configure<ConsumerOptions>("RedPanda", builder.Configuration.GetSection("MessagingSystem:RedPanda"));

// Add services to the container.
builder.Services.AddSingleton<IMessageProducerFactory, MessageProducerFactory>();
builder.Services.AddHostedService<KafkaConsumerService>();
builder.Services.AddHostedService<RedPandaConsumerService>();

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
