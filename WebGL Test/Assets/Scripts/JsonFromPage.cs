using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class JsonFromPage : MonoBehaviour
{
    [SerializeField] TextMeshProUGUI textbox1;
    [SerializeField] TextMeshProUGUI textbox2;

    public void testJson(string json)
    {
        JsonObject myJson = JsonUtility.FromJson<JsonObject>(json);
        textbox1.text = myJson.name;
        textbox2.text = myJson.value.ToString();
    }

    public class JsonObject
    {
        public string name;
        public int value;
    }
}
