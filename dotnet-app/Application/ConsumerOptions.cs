using Confluent.Kafka;

namespace Application;

public class ConsumerOptions
{
    public string BootstrapServers { get; set; } = string.Empty;
    public string GroupId { get; set; } = string.Empty;
    public string Topic { get; set; } = string.Empty;
    public AutoOffsetReset AutoOffsetReset { get; set; } = AutoOffsetReset.Earliest;
}