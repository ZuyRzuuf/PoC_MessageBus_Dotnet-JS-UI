using Microsoft.Extensions.Options;

namespace Application;

public class KafkaConsumerService : BackgroundService
{
    private readonly MessageConsumerService _messageConsumerService;

    public KafkaConsumerService(IServiceProvider serviceProvider)
    {
        _messageConsumerService = new MessageConsumerService(
            serviceProvider.GetRequiredService<ILogger<MessageConsumerService>>(),
            serviceProvider.GetRequiredService<IOptionsMonitor<ConsumerOptions>>(),
            "Kafka");
    }

    protected override Task ExecuteAsync(CancellationToken stoppingToken)
    {
        return _messageConsumerService.StartConsumerLoopAsync(stoppingToken);
    }
}
