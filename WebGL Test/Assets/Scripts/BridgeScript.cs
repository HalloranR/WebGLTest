using UnityEngine;

/// <summary>
/// Bridge used to communicate with a page
/// </summary>
public class BridgeScript : MonoBehaviour
{
    // Reference to the UI panel to display received message.
    [SerializeField]
    private UIFromPage fromPage;
    [SerializeField]
    private JsonFromPage jsonInfo;

    /// <summary>
    /// Receives the message from a page.
    /// </summary>
    /// <param name="message">Message.</param>
    public void ReceiveMessageFromPage(string message)
    {
        // Display the message
        fromPage.DisplayMessage(message);
    }

    /// <summary>
    /// Sends the message to a page.
    /// </summary>
    /// <param name="message">Message.</param>
    public void SendMessageToPage(string message)
    {
        // Sends the message through JS plugin
        WebGLPluginJS.SendMessageToPage(message);
    }

    public void ReceiveNumberFromPage(int num)
    {
        int _num = num;

        WebGLPluginJS.DisplayNum(_num);
    }

    public void RecieveJsonFromPage(string json)
    {
        //Debug.Log(json);
        print(json);
        jsonInfo.testJson(json);
    }

    private void Start()
    {
        //WebGLPluginJS.CallFunction();
    }
}

