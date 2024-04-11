using Confluent.Kafka;
using Microsoft.Extensions.Options;

namespace Application;

public interface IMessageProducerFactory
{
    IMessageProducer CreateProducer(string configName);
}

public class MessageProducerFactory(IOptions<MessengerOptions> messengerOptions, ILogger<MessageProducer> logger)
    : IMessageProducerFactory
{
    private readonly MessengerOptions _messengerOptions = messengerOptions.Value;

    public IMessageProducer CreateProducer(string configName)
    {
        var producer = new MessageProducer(logger);
        ProducerConfig config;

        switch (configName)
        {
            case "Kafka":
                config = ProducerConfig(_messengerOptions.Kafka);
                producer.ConfigureProducer(config, _messengerOptions.Kafka.Topic);
                break;
            case "RedPanda":
                config = ProducerConfig(_messengerOptions.RedPanda);
                producer.ConfigureProducer(config, _messengerOptions.RedPanda.Topic);
                break;
        }

        return producer;
    }
    
    private static ProducerConfig ProducerConfig(KafkaOptions options)
    {
        var config = new ProducerConfig
        {
            BootstrapServers = options.BootstrapServers,
            ClientId = options.ClientId,
            MessageSendMaxRetries = options.MessageSendMaxRetries,
            Acks = Enum.TryParse<Acks>(options.Acks, true, out var acks) 
                ? acks 
                : Acks.All,
            CompressionType = Enum.TryParse<CompressionType>(options.CompressionType, true, out var compressionType) 
                ? compressionType 
                : CompressionType.None
        };

        return config;
    }
}

