import * as z from "zod"

export const formSchema = z.object({
    message : z.string().min(1,{
        message : "Write your email",
    }),
    tone : z.string().min(1),
    languages : z.string().min(1),
    words : z.string().min(1),
    purpose : z.string().min(1)
})

export const  languageOptions = [
        {label: "Albanian", value: "Albanian"},
        {label: "Arabic", value: "Arabic"},
        {label: "Armenian", value: "Armenian"},
        {label: "Awadhi", value: "Awadhi"},
        {label: "Azerbaijani", value: "Azerbaijani"},
        {label: "Bashkir", value: "Bashkir"},
        {label: "Basque", value: "Basque"},
        {label: "Belarusian", value: "Belarusian"},
        {label: "Bengali", value: "Bengali"},
        {label: "Bhojpuri", value: "Bhojpuri"},
        {label: "Bosnian", value: "Bosnian"},
        {label: "Brazilian Portuguese", value: "Brazilian Portuguese"},
        {label: "Bulgarian", value: "Bulgarian"},
        {label: "Cantonese (Yue)", value: "Cantonese (Yue)"},
        {label: "Catalan", value: "Catalan"},
        {label: "Chhattisgarhi", value: "Chhattisgarhi"},
        {label: "Chinese", value: "Chinese"},
        {label: "Croatian", value: "Croatian"},
        {label: "Czech", value: "Czech"},
        {label: "Danish", value: "Danish"},
        {label: "Dogri", value: "Dogri"},
        {label: "Dutch", value: "Dutch"},
        {label: "English", value: "English"},
        {label: "Estonian", value: "Estonian"},
        {label: "Faroese", value: "Faroese"},
        {label: "Finnish", value: "Finnish"},
        {label: "French", value: "French"},
        {label: "Galician", value: "Galician"},
        {label: "Georgian", value: "Georgian"},
        {label: "German", value: "German"},
        {label: "Greek", value: "Greek"},
        {label: "Gujarati", value: "Gujarati"},
        {label: "Haryanvi", value: "Haryanvi"},
        {label: "Hindi", value: "Hindi"},
        {label: "Hungarian", value: "Hungarian"},
        {label: "Indonesian", value: "Indonesian"},
        {label: "Irish", value: "Irish"},
        {label: "Italian", value: "Italian"},
        {label: "Japanese", value: "Japanese"},
        {label: "Javanese", value: "Javanese"},
        {label: "Kannada", value: "Kannada"},
        {label: "Kashmiri", value: "Kashmiri"},
        {label: "Kazakh", value: "Kazakh"},
        {label: "Konkani", value: "Konkani"},
        {label: "Korean", value: "Korean"},
        {label: "Kyrgyz", value: "Kyrgyz"},
        {label: "Latvian", value: "Latvian"},
        {label: "Lithuanian", value: "Lithuanian"},
        {label: "Macedonian", value: "Macedonian"},
        {label: "Maithili", value: "Maithili"},
        {label: "Malay", value: "Malay"},
        {label: "Maltese", value: "Maltese"},
        {label: "Mandarin", value: "Mandarin"},
        {label: "Mandarin Chinese", value: "Mandarin Chinese"},
        {label: "Marathi", value: "Marathi"},
        {label: "Marwari", value: "Marwari"},
        {label: "Min Nan", value: "Min Nan"},
        {label: "Moldovan", value: "Moldovan"},
        {label: "Mongolian", value: "Mongolian"},
        {label: "Montenegrin", value: "Montenegrin"},
        {label: "Nepali", value: "Nepali"},
        {label: "Norwegian", value: "Norwegian"},
        {label: "Oriya", value: "Oriya"},
        {label: "Pashto", value: "Pashto"},
        {label: "Persian (Farsi)", value: "Persian (Farsi)"},
        {label: "Polish", value: "Polish"},
        {label: "Portuguese", value: "Portuguese"},
        {label: "Punjabi", value: "Punjabi"},
        {label: "Rajasthani", value: "Rajasthani"},
        {label: "Romanian", value: "Romanian"},
        {label: "Russian", value: "Russian"},
        {label: "Sanskrit", value: "Sanskrit"},
        {label: "Santali", value: "Santali"},
        {label: "Serbian", value: "Serbian"},
        {label: "Sindhi", value: "Sindhi"},
        {label: "Sinhala", value: "Sinhala"},
        {label: "Slovak", value: "Slovak"},
        {label: "Slovene", value: "Slovene"},
        {label: "Slovenian", value: "Slovenian"},
        {label: "Spanish", value: "Spanish"},
        {label: "Swahili", value: "Swahili"},
        {label: "Swedish", value: "Swedish"},
        {label: "Tajik", value: "Tajik"},
        {label: "Tamil", value: "Tamil"},
        {label: "Tatar", value: "Tatar"},
        {label: "Telugu", value: "Telugu"},
        {label: "Thai", value: "Thai"},
        {label: "Turkish", value: "Turkish"},
        {label: "Turkmen", value: "Turkmen"},
        {label: "Ukrainian", value: "Ukrainian"},
        {label: "Urdu", value: "Urdu"},
        {label: "Uzbek", value: "Uzbek"},
       
]

export const voiceOptions = [
    {
        value : "Professional",
        label : "Professional"
    },
    {
        value : "Formal",
        label : "Formal"
    },
    {
        value : "Informal",
        label : "Informal"
    },
    {
        value : "Funny",
        label : "Funny"
    },
    {
        value : "Urgent",
        label : "Urgent"
    },
]
export const Wordsptions = [
    
    {
        value : "100",
        label : "Short"
    },
    {
        value : "500",
        label : "Medium"
    },
    {
        value : "1000",
        label : "Large"
    },
   
]

export const PurposeOptions = [
    
        {label: "Apology", value: "an apology"},
        {label: "Birthday Wishes", value: "a birthday Wishes"},
        {label: "Celebration", value: "a celebration"},
        {label: "Cold Email", value: " a cold Email"},
        {label: "Company Updates", value: "a company update"},
        {label: "Deadline Reminders", value: "a deadline reminder"},
        {label: "Event Invitations", value: "a event invitation"},
        {label: "Follow-ups", value: "a follow-up"},
        {label: "Greetings", value: "a greeting"},
        {label: "Holiday Greetings", value: "a holiday Greeting"},
        {label: "Job Application", value: "a job Application"},
        {label: "Meeting Requests", value: "a meeting Request"},
        {label: "Mentorship Requests", value: "a Mentorship Request"},
        {label: "Official Communications", value: "a official communication"},
        {label: "Sales", value: "a sales message"},
        {label: "Security Alerts", value: "a security alert"}
      
      
]

