namespace Application;

public class MessengerOptions
{
    public KafkaOptions Kafka { get; set; } = new KafkaOptions();
    public RedPandaOptions RedPanda { get; set; } = new RedPandaOptions();
}

public class KafkaOptions
{
    public string BootstrapServers { get; set; } = string.Empty;
    public string ClientId { get; set; } = string.Empty;
    public string GroupId { get; set; } = string.Empty;
    public string Topic { get; set; } = string.Empty;
    public string AutoOffsetReset { get; set; } = string.Empty;
    public string Acks { get; set; }
    public string CompressionType { get; set; } = string.Empty;
    public int MessageSendMaxRetries { get; set; }
}

public class RedPandaOptions : KafkaOptions;