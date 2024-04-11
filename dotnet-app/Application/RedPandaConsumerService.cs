using Microsoft.Extensions.Options;

namespace Application;

public class RedPandaConsumerService : BackgroundService
{
    private readonly MessageConsumerService _messageConsumerService;

    public RedPandaConsumerService(IServiceProvider serviceProvider)
    {
        _messageConsumerService = new MessageConsumerService(
            serviceProvider.GetRequiredService<ILogger<MessageConsumerService>>(),
            serviceProvider.GetRequiredService<IOptionsMonitor<ConsumerOptions>>(),
            "RedPanda");
    }

    protected override Task ExecuteAsync(CancellationToken stoppingToken)
    {
        return _messageConsumerService.StartConsumerLoopAsync(stoppingToken);
    }
}
