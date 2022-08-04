using UnityEngine;
using System.Runtime.InteropServices;

/// <summary>
/// Class with a JS Plugin functions for WebGL.
/// </summary>
public class WebGLPluginJS : MonoBehaviour {

    // Importing "CallFunction"
    [DllImport("__Internal")]
    public static extern void CallFunction();

    // Importing "CallFunction"
    [DllImport("__Internal")]
    public static extern void DisplayNum(int num);

    // Importing "CallFunction"
    [DllImport("__Internal")]
    public static extern void DisplayStr(string str);

    // Importing "SendMessageToPage"
    [DllImport("__Internal")]
    public static extern void SendMessageToPage(string text);
}
