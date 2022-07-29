using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class JSBridge : MonoBehaviour
{
    [SerializeField] TextMeshProUGUI textBox;

    public void ChangeText(string str)
    {
        textBox.text = str;
    }

    private void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            ChangeText("Hello!");
        }
    }
}
