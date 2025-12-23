import { GoogleGenAI, Schema, Type } from "@google/genai";
import { Message, ThemeConfig } from "../types";
import { DEFAULT_THEME } from "../constants";

// WARNING: In a production app, never expose API keys on the client.
const API_KEY = "";

const ai = new GoogleGenAI({ apiKey: API_KEY });

// --- Chat Logic ---

const WIDGET_SYSTEM_INSTRUCTION = `
You are an intelligent chatbot assistant. Your goal is to help the user.
You can respond with standard text, or you can trigger specific UI widgets when appropriate.

Available Widgets:
1. 'date_picker': Use when the user wants to schedule something.
2. 'quick_replies': Use when the user needs to choose from a few simple options (Yes/No, Categories).
3. 'dropdown': Use for selecting from a long list (like countries or categories).
4. 'carousel': Use when showing products, places, or visual items.
5. 'form': Use when you need to collect multiple pieces of data (name, email, etc.).
6. 'feedback': Use when you want to ask the user for a rating or satisfaction score.
7. 'file_upload': Use when you need the user to upload a document or image.

Response Format:
You MUST return a JSON object (no markdown formatting).
{
  "type": "text" | "date_picker" | "quick_replies" | "dropdown" | "carousel" | "form" | "feedback" | "file_upload",
  "content": "The text message to display",
  "widgetData": { ... specific data for the widget ... }
}

Examples:
- User: "Book a meeting."
  → { "type": "date_picker", "content": "Select a meeting date:", "widgetData": { "title": "Pick a date" } }

- User: "Do you like pizza?"
  → { "type": "quick_replies", "content": "Choose an answer:", "widgetData": { "options": ["Yes", "No"] } }

- User: "Pick a country from Asia"
  → { "type": "dropdown", "content": "Select a country:", "widgetData": { "title": "Country", "options": [{"label":"India","value":"IN"},{"label":"Japan","value":"JP"}] } }

- User: "Show me mobile phones"
  → { "type": "carousel", "content": "Here are some options:", "widgetData": { "items": [ { "title": "iPhone 15", "description": "Latest model", "imageUrl": "https://..." }, { "title": "Samsung S24", "description": "New release", "imageUrl": "https://..." } ] } }

- User: "Fill my contact form"
  → { "type": "form", "content": "Enter your information:", "widgetData": { "title": "Contact Info", "fields": [ { "name": "name", "label": "Full Name", "type": "text" }, { "name": "email", "label": "Email", "type": "email" } ] } }

- User: "Rate our service"
  → { "type": "feedback", "content": "How was your experience?", "widgetData": { "title": "Rate us" } }

- User: "Upload my ID"
  → { "type": "file_upload", "content": "Please upload your ID:", "widgetData": { "allowedTypes": ["image/*", ".pdf"] } }
  `;

export const sendMessageToGemini = async (
  history: Message[],
  userMessage: string
): Promise<{ type: string; content: string; widgetData?: any }> => {
  if (!API_KEY) {
    return {
      type: "text",
      content: "Error: API Key is missing. Check your environment variables.",
    };
  }

  try {
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: WIDGET_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
      },
      history: history.map((h) => ({
        role: h.role,
        parts: [{ text: h.content }],
      })),
    });

    const result = await chat.sendMessage({ message: userMessage });
    const responseText = result.text;
    console.log("Gemini Response:", responseText);
    if (!responseText) throw new Error("No response");

    return JSON.parse(responseText);
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return {
      type: "text",
      content: "I'm having trouble connecting right now.",
    };
  }
};

// --- Theme Generation Logic ---

const MAIN_THEME_SCHEMA = {
  "user_avatar": {
    "text": "",
    "image_size": 16,
    "text_size": 10,
    "text_color": "#8D99A8",
    "image_alignment": "bottom",
    "show_text": false,
    "show_icon": false
  },
  "agent_avatar": {
    "text": "bbAssist",
    "image_size": "9",
    "text_size": "9",
    "text_color": "#8D99A8",
    "image_alignment": "top",
    "show_text": true,
    "show_icon": true
  },
  "header_text_color": "white",
  "header_logo_show": true,
  "header_logo_size": "24",
  "header_bg_color": "#ecad4f",
  "header_text_size": 23,
  "header_text_align": "center",
  "powered_detail": {
    "powered_by_bg_color": "#ecad4f",
    "powered_by_text": "Powered by KaptureCX",
    "powered_by_txt_color": "#141414",
    "powered_by_txt_size": 13
  },
  "chat_detail": {
    "submit_btn_text_color": "#ffffff",
    "submit_btn_bg_color": "#F0535C",
    "agent_msg_bg_color": "#EFF6F3",
    "submit_btn_text": "Submit",
    "user_msg_bg_color": "#005E33",
    "chat_header_text": "Chat with us",
    "user_msg_icon": "",
    "agent_msg_icon": "https://kapture-p-v2.storage.googleapis.com/0/chat-attachments/1125/17637096390700lk9aal9f7o/Icon_Library.svg",
    "submit_btn_align": "left",
    "submit_btn_shape": "rounded",
    "user_msg_txt_color": "#fff",
    "user_msg_txt_size": "14",
    "agent_msg_txt_color": "#2B2b2b",
    "agent_msg_txt_size": "14",
    "user_msg_template": {
      "key": "template_1",
      "borderRadius": "8px 8px 0px 8px",
      "alignment": "right",
      "timer_placement": "Inside"
    },
    "agent_msg_template": {
      "key": "template_1",
      "borderRadius": "8px 8px 8px 0px",
      "alignment": "right",
      "timer_placement": "Inside"
    },
    "name_attr": {
      "field": false,
      "required": false,
      "label": "Name",
      "placeholder": ""
    },
    "email_attr": {
      "field": false,
      "required": false,
      "label": "Your Email"
    },
    "phone_attr": {
      "field": false,
      "required": false,
      "label": "Phone number"
    },
    "dept_attr": {
      "field": false,
      "required": false
    },
    "msg_attr": {
      "field": false,
      "required": false
    },
    "other_attr": {
      "field": false,
      "required": false
    },
    "otp_attr": {
      "field": false,
      "required": false
    }
  },
  "powerd_by": false,
  "need_help_bg_color": "#ECAD4F",
  "close_icon_name": "cancel",
  "close_icon_color": "#ffffff",
  "need_help_txt_color": "#141414",
  "need_help_position": "bottom-right",
  "additional-fields": "enable_reaction_on_messages,kap_page_loader_img,kap_loader_height,kap_loader_width,enable_markdown,msg_spinner_template,chatbox_border_color,chat_input_border_radius,CUSTOM_CSS,enable_single_product_selection,chat_auto_functionality,one_click_feedback_submission,enable_language_selector,addtailOnBubble,order_section_spacing,option_list_alignment,chat_template,order_item_txt_size,mob_msg_width,product_image_size,customer_chat_timing_text_color,agent_chat_timing_text_color,quickreply_menu_txt_size,feedback_impression",
  "is_feedback": true,
  "is_feedback_details": {
    "feedback_text": "We would like your feedback to improve our chat",
    "feedback_impression": "stars",
    "feedback_text_area": true
  },
  "is_floatable_elm": false,
  "floatable_elm_details": {
    "floatable_text": "Float ",
    "floatable_text_color": "#000000",
    "floatable_bg_color": ""
  },
  "is_sound_alert": false,
  "server_host": "ms-noauth",
  "close_modal_msg": "Are You sure you want to close the chat conversation",
  "quickreply_btn_txt_color": "#0d0d0e",
  "quickreply_btn_bg_color": "#ffffff",
  "list_text_color": "#000000",
  "list_bg_color": "#ffffff",
  "quickreply_menu_border_color": "#fff",
  "quickreply_menu_border_width": "0",
  "quickreply_btn_border_width": 1,
  "notification_sound": "",
  "chat_icon_color": "#141414",
  "chat_launcher_icon": "https://kapture-p-v2.storage.googleapis.com/0/chat-attachments/1025/17611260553040anmxlcc8oa/Icon_Asset.png",
  "chat_launcher_icon_background": "#082F49",
  "chat_launcher_side_spacing": "0",
  "chat_launcher_bottom_spacing": "00",
  "need_help_text": "Help?",
  "chat_launcher_shape": "Bar",
  "chat_launcher_mobile_shape": "Circle",
  "order_bg_color": "#EFF6F3",
  "order_txt_color": "#6f6f6f",
  "enable_faqs": false,
  "clientBaseUrl": "https://jfpslstaging.int.kapturecrm.com",
  "go_back_link": "https://selfserveapp.kapturecrm.com/cb-v1/go-back",
  "customer_reply_template": "3",
  "launcher_vertical_spacing": "12",
  "launcher_horizontal_spacing": "16",
  "launcher_text_size": "16",
  "chat_attachment_icon": "attach_file",
  "chat_reply_icon": "https://kapture-p-v2.storage.googleapis.com/0/chat-attachments/1125/17637240535550ui3c3khkxn/Frame_5.svg",
  "rate_ticket_bg_color": "#fff",
  "smileyImages": {
    "bad": "https://kapture-p.storage.googleapis.com/0/chat/0225/17393670465870opl9rnf8mo/smiley-1.svg",
    "poor": "https://kapture-p.storage.googleapis.com/0/chat/0225/17393670464130zblj01o8yt/smiley-2.svg",
    "average": "https://kapture-p.storage.googleapis.com/0/chat/0225/17393670462490b7srztsqoy/smiley-3.svg",
    "good": "https://kapture-p.storage.googleapis.com/0/chat/0225/17393670460750vj9csz2vxf/smiley-4.svg",
    "excellent": "https://kapture-p.storage.googleapis.com/0/chat/0225/17393670457380oy106omdc5/smiley-5.svg"
  },
  "close_icon_dimension": 20,
  "script_type": "NR",
  "form_required": "no",
  "header_logo_image": "https://kapture-p-v2.storage.googleapis.com/0/chat-attachments/1025/17610293728960jf4og5ey47/jio-logo.png",
  "hide_header_footer": true,
  "font_family_name": "Inter",
  "font_family_url": "https://fonts.gstatic.com/s/inter/v18/UcCo3FwrK3iLTcvvYwYL8g.woff2",
  "disable_attachment": true,
  "is_full_screen": false,
  "full_screen_msg_width": "",
  "chat_popup_auto_open": true,
  "chat_reply_icon_size": "32",
  "quickreply_btn_border_color": "#e4e4e4",
  "list_txt_color": "#008548",
  "quickreply_menu_border_radius": "8",
  "chat_page_background": "",
  "enable_reaction_on_messages": true,
  "kap_page_loader_img": "https://kapture-p-v2.storage.googleapis.com/1007082/repository-file-attachments/1025/17616633641930jii0uju5cc/Jio_Finance_loader__300262_1761663364193.gif",
  "kap_loader_height": "40",
  "kap_loader_width": "40",
  "enable_markdown": true,
  "msg_spinner_template": "2",
  "chatbox_border_color": "transparent",
  "chat_input_border_radius": "32",
  "CUSTOM_CSS": "#parent_kapchat_container .chat-reply-form > #BtnChatReplySubmit {   right: 4px !important; }  #chatReplyFrm > div {   border: none !important;   background: #f6f7f8 !important; }.product_details_container_2_right { align-items: end !important; }.product_response_container { width: 300px; max-width: 100%; margin-left: auto; padding: 0; box-sizing: border-box; }",
  "enable_single_product_selection": true,
  "chat_auto_functionality": "No",
  "one_click_feedback_submission": true,
  "enable_language_selector": true,
  "addtailOnBubble": "",
  "order_section_spacing": "0",
  "option_list_alignment": "start",
  "chat_template": "custom",
  "order_item_txt_size": "12",
  "mob_msg_width": "calc(100% - 24px)",
  "product_image_size": "64",
  "customer_chat_timing_text_color": "#E0E0E0",
  "agent_chat_timing_text_color": "#585858",
  "quickreply_menu_txt_size": "14",
  "feedback_impression": "stars"
}
export const THEME_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    user_avatar: {
      type: Type.OBJECT,
      properties: {
        text_color: { type: Type.STRING }
      },
      required: ["text_color"]
    },

    agent_avatar: {
      type: Type.OBJECT,
      properties: {
        text_color: { type: Type.STRING },
      },
      required: ["text_color"]
    },

    header_text_color: { type: Type.STRING },
    header_bg_color: { type: Type.STRING },

    powered_detail: {
      type: Type.OBJECT,
      properties: {
        powered_by_bg_color: { type: Type.STRING },
        powered_by_txt_color: { type: Type.STRING }
      },
      required: [
        "powered_by_bg_color",
        "powered_by_txt_color"
      ]
    },

    chat_detail: {
      type: Type.OBJECT,
      properties: {
        submit_btn_text_color: { type: Type.STRING },
        submit_btn_bg_color: { type: Type.STRING },
        agent_msg_bg_color: { type: Type.STRING },
        user_msg_bg_color: { type: Type.STRING },
        user_msg_txt_color: { type: Type.STRING },
        agent_msg_txt_color: { type: Type.STRING },
        need_help_bg_color: { type: Type.STRING },
        close_icon_color: { type: Type.STRING },
        need_help_txt_color: { type: Type.STRING },

        floatable_elm_details: {
          type: Type.OBJECT,
          properties: {
            floatable_text_color: { type: Type.STRING },
            floatable_bg_color: { type: Type.STRING }
          },
          required: [
            "floatable_text_color",
            "floatable_bg_color"
          ]
        },

        quickreply_btn_txt_color: { type: Type.STRING },
        quickreply_btn_bg_color: { type: Type.STRING },
        list_text_color: { type: Type.STRING },
        list_bg_color: { type: Type.STRING },
        quickreply_menu_border_color: { type: Type.STRING },
        chat_icon_color: { type: Type.STRING },

        chat_launcher_icon_background: { type: Type.STRING },


        order_bg_color: { type: Type.STRING },
        order_txt_color: { type: Type.STRING },

        quickreply_btn_border_color: { type: Type.STRING },
        customer_chat_timing_text_color: { type: Type.STRING },
        agent_chat_timing_text_color: { type: Type.STRING },

      },
      required: [
        "submit_btn_text_color",
        "submit_btn_bg_color",
        "agent_msg_bg_color",
        "user_msg_bg_color",
        "user_msg_txt_color",
        "agent_msg_txt_color",
        "need_help_bg_color",
        "close_icon_color",
        "need_help_txt_color",
        "quickreply_btn_txt_color",
        "quickreply_btn_bg_color",
        "list_text_color",
        "list_bg_color",
        "quickreply_menu_border_color",
        "chat_icon_color",
        "chat_launcher_icon_background",
        "order_bg_color",
        "order_txt_color",
        "quickreply_btn_border_color",
        "customer_chat_timing_text_color",
        "agent_chat_timing_text_color",
      ]
    }
  },

  required: [
    "user_avatar",
    "agent_avatar",
    "header_text_color",
    "header_bg_color",
    "powered_detail",
    "chat_detail"
  ]
};




export const generateThemeFromImage = async (
  base64Image: string
): Promise<any> => {
  if (!API_KEY) throw new Error("API Key missing");

  const base64Data = base64Image.replace(
    /^data:image\/(png|jpeg|jpg|webp);base64,/,
    ""
  );

  // ---- Helper: Deep Merge ----
  const deepMerge = (target: any, source: any): any => {
    if (!source) return target;
    const output = { ...target };

    for (const key in source) {
      if (
        typeof source[key] === "object" &&
        source[key] !== null &&
        !Array.isArray(source[key])
      ) {
        output[key] = deepMerge(target[key] || {}, source[key]);
      } else {
        output[key] = source[key];
      }
    }
    return output;
  };

  try {
    // ---- Call Gemini to extract theme data ----
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/png",
              data: base64Data,
            },
          },
          {
            text: `
              Analyze this image and extract colors to style a chatbot.

              RULES:
              1. MAIN/DOMINANT color → primary.
              2. SECONDARY color → secondary.
              3. Other brand colors → accent, neutral, surface.
              4. surface = opposite brightness to background.
              5. Return JSON that STRICTLY follows THEME_SCHEMA.
            `,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: THEME_SCHEMA,
      },
    });

    // AI Theme (already validated by THEME_SCHEMA)
    const aiTheme = JSON.parse(response.text || "{}");
    console.log("AI Theme:", aiTheme);
    // ---- FINAL MERGE ----
    const mergedTheme = deepMerge(MAIN_THEME_SCHEMA, aiTheme);
    console.log("Merged Theme:", mergedTheme);
    return mergedTheme;
  } catch (error) {
    console.error("Theme Gen Error:", error);
    throw error;
  }
};

