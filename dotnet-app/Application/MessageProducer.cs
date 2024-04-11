using System.Text.Json;
using Confluent.Kafka;

namespace Application;

public interface IMessageProducer
{
    Task<PersistenceStatus> SendMessageAsync(MessageModel message, CancellationToken cancellationToken = default);
}

public class MessageProducer(ILogger<MessageProducer> logger) : IMessageProducer
{
    private IProducer<Null, string>? _messageProducer;
    private string Topic { get; set; } = string.Empty;
    
    public void ConfigureProducer(ProducerConfig config, string topic)
    {
        Topic = topic;
        _messageProducer = new ProducerBuilder<Null, string>(config).Build();
    }

    public async Task<PersistenceStatus> SendMessageAsync(MessageModel message, CancellationToken cancellationToken = default)
    {
        logger.LogDebug("Message to send: {message}", message);
        var topicMessage = new Message<Null, string> { Value = message.Message };

        if (_messageProducer == null) throw new InvalidOperationException("Producer is not configured.");
        
        var deliveryResult = await _messageProducer.ProduceAsync(Topic, topicMessage, cancellationToken);
        logger.LogInformation("Message '{message}' sent to partition {partition}: {offset}", 
            deliveryResult.Message.Value, deliveryResult.Partition, deliveryResult.Offset);
        
        return deliveryResult.Status;
    }
}