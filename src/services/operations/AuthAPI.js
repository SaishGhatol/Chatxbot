import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { endpoints } from "../api"

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints


// ================ send Otp ================
export function sendOtp(email, navigate) {
  return async (dispatch) => {
 
    const toastId = toast.loading("Loading...");
    
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      // console.log("SENDOTP API RESPONSE ---> ", response)

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      console.log("SENDOTP API ERROR --> ", error);
      toast.error(error.response?.data?.message || error.message);
    }
    toast.dismiss(toastId);
  }
}

// ================ sign Up ================
export function signUp(username, email, password, confirmPassword, otp, navigate) {
  return async (dispatch) => {

    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        username,
        email,
        password,
        confirmPassword,
        otp,
      })

      // console.log("SIGNUP API RESPONSE --> ", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR --> ", error);
      toast.error(error.response?.data?.message || "Invalid OTP");
    }
    toast.dismiss(toastId);
  }
}


// ================ Login ================
export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    
    try {
      const response = await apiConnector("POST", LOGIN_API, { email, password });
      
      if (!response.data.success) {
        throw new Error(response.data.message || "Login failed");
      }
      
      // Store user data and token
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      toast.success("Login Successful");
      
      if (navigate) {
        navigate("/");
      }
      
      return response.data;  // Return full response data
    } catch (error) {
      const errorMessage = error.response?.data?.message 
        || error.message 
        || "Login failed due to network error";
      
      console.log("LOGIN API ERROR --> ", error);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      toast.dismiss(toastId);
    }
  }
}

// ================ get Password Reset Token ================
export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {

    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      })

      console.log("RESET PASS TOKEN RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Reset Email Sent")
      setEmailSent(true)
    } catch (error) {
      console.log("RESET PASS TOKEN ERROR............", error)
      toast.error(error.response?.data?.message || error.message || "Failed to send reset email")
    }
    toast.dismiss(toastId)
  }
}


// ================ reset Password ================
export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")

    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      })

      console.log("RESETPASSWORD RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Password Reset Successfully")
      navigate("/login")
    } catch (error) {
      console.log("RESETPASSWORD ERROR............", error)
      toast.error(error.response?.data?.message || error.message || "Failed To Reset Password");
    }
    toast.dismiss(toastId)
  }
}

// ================ Logout ================
export function logout(navigate) {
  return (dispatch) => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}