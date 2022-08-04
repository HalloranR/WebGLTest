using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
/// <summary>
/// Disable capturing whole input on the page
/// Read more: https://docs.unity3d.com/ScriptReference/WebGLInput-captureAllKeyboardInput.html
/// </summary>
public class DisableWebGLInputCapture : MonoBehaviour
{
    [SerializeField] private Toggle toggle ;

    void Start()
    {
        WebGLInput.captureAllKeyboardInput = false;
        toggle.onValueChanged.AddListener((value) => { WebGLInput.captureAllKeyboardInput = value; });
    }

}