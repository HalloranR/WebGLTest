using System.Collections;
using System.Collections.Generic;
using UnityEngine;
/// <summary>
/// Disable capturing whole input on the page
/// Read more: https://docs.unity3d.com/ScriptReference/WebGLInput-captureAllKeyboardInput.html
/// </summary>
public class DisableWebGLInputCapture : MonoBehaviour
{
    void Start()
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        WebGLInput.captureAllKeyboardInput = false;
#endif
    }

    private void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            Debug.Log("Print to console");
            WebGLInput.captureAllKeyboardInput = true;
        }
        if (Input.GetKeyDown(KeyCode.V))
        {
            Debug.Log("Print to console");
            WebGLInput.captureAllKeyboardInput = false;
        }
    }
}