using System.Text.Json.Serialization;

namespace Application;

public class MessageModel
{
    [JsonPropertyName("message")]
    public string Message { get; set; }
}
