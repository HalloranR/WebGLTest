using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;
using System;
using Newtonsoft.Json;

public class JsonFromPage : MonoBehaviour
{
    [SerializeField] TextMeshProUGUI textbox1;
    [SerializeField] TextMeshProUGUI textbox2;

    public void testJson(string json)
    {
        SceneConfig sceneData = new SceneConfig();
        sceneData.name = "test";
        sceneData.value = 1;

        string json2 = JsonUtility.ToJson(sceneData);

        //SceneConfig myJson = JsonConvert.DeserializeObject<SceneConfig>(json);
        SceneConfig myJson = JsonUtility.FromJson<SceneConfig>(json);
        //WebGLPluginJS.DisplayStr("What arrives in Unity: " + json + " | " + json2);
        //WebGLPluginJS.DisplayStr("Name in Unity "+ myJson.name);
        //WebGLPluginJS.DisplayNum(myJson.value);
        //
        textbox1.text = myJson.name;
        textbox2.text = myJson.value.ToString();

    }

    [Serializable] public class SceneConfig
    {
        public string name;
        public int value;
    }
}
