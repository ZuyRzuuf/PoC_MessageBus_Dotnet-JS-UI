using Confluent.Kafka;
using Microsoft.Extensions.Options;

namespace Application;

public class MessageConsumerService : BackgroundService
{
    private readonly ILogger<MessageConsumerService> _logger;
    private readonly IOptionsMonitor<ConsumerOptions> _optionsMonitor;
    private readonly string _configurationName;

    public MessageConsumerService(
        ILogger<MessageConsumerService> logger,
        IOptionsMonitor<ConsumerOptions> optionsMonitor,
        string configurationName)
    {
        _logger = logger;
        _optionsMonitor = optionsMonitor;
        _configurationName = configurationName;
    }
    
    public Task StartConsumerLoopAsync(CancellationToken cancellationToken) => ExecuteAsync(cancellationToken);
    
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await Task.Yield();
        
        var options = _optionsMonitor.Get(_configurationName);

        var config = new ConsumerConfig
        {
            BootstrapServers = options.BootstrapServers,
            GroupId = options.GroupId,
            AutoOffsetReset = AutoOffsetReset.Earliest
        };

        using var consumer = new ConsumerBuilder<Ignore, string>(config).Build();
        consumer.Subscribe(options.Topic);

        if (stoppingToken.IsCancellationRequested)
        {
            _logger.LogInformation("OMG! I'm stopping!");
        }
        
        while (!stoppingToken.IsCancellationRequested)
        {
            var consumeResult = consumer.Consume(stoppingToken);
            _logger.LogInformation("Received message: {message} on topic {topic}",
                consumeResult.Message.Value, consumeResult.TopicPartitionOffset);
        }
    }
}