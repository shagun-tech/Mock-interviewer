import axios from "axios";
import { BACKEND_URL } from "@/utils/constants";

export async function createInterview(formData) {
  try {
    axios.defaults.withCredentials = true;

    const response = await axios.post(`${BACKEND_URL}/interviews`, formData);

    console.log("Interview Created:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error in creating interview:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function createFeedback(formData) {
  console.log(formData);
  try {
    axios.defaults.withCredentials = true;

    const response = await axios.post(`${BACKEND_URL}/feedbacks`, formData);

    console.log("Feedback Created:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error in creating feedback:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function getFeedbackByMockId(mockId) {
  try {
    axios.defaults.withCredentials = true;

    const response = await axios.get(`${BACKEND_URL}/feedbacks`, {
      params: { mockId },
    });

    console.log("Feedback Data:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error in getting feedback:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function fetchInterviewById(mockId) {
  try {
    axios.defaults.withCredentials = true;

    const response = await axios.get(`${BACKEND_URL}/interviews/by-id`, {
      params: { mockId },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching interview by ID:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function fetchAllInterviews() {
  try {
    axios.defaults.withCredentials = true;

    const response = await axios.get(`${BACKEND_URL}/interviews`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching interviews:",
      error.response?.data || error.message
    );
    throw error;
  }
}
