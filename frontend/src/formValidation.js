export const loginFormValidation = (email, password) => {
    if (!email && !password) {
        return {
            emailError: "email is required",
            passwordError: "password is required"
        }
    }
    if (!email) {
        return {
            emailError: "email is required"
        }
    }
    if (!password) {
        return {
            passwordError: "password is required"
        }
    }
    return null
}

export const signUpFormValidation = (name, email, password) => {
    if (!name && !email && !password) {
        return {
            nameError: "name is required",
            emailError: "email is required",
            passwordError: "password must be contain 8 charaters"
        }
    }
    if (!name && !email) {
        if (password.length < 8) {
            return {
                nameError: "name is required",
                emailError: "email is required",
                passwordError: "password must be contain 8 charaters"
            }
        } else {
            return {
                nameError: "name is required",
                emailError: "email is required"
            }
        }
    }
    if (!name && !password) {
        return {
            nameError: "name is required",
            passwordError: "password must be contain 8 charaters"
        }
    }
    if (!email && !password) {
        return {
            emailError: "email is required",
            passwordError: "password must be contain 8 charaters"
        }
    }
    if (!name) {
        if (password.length < 8) {
            return {
                nameError: "name is required",
                passwordError: "password must be contain 8 charaters"
            }
        } else {
            return {
                nameError: "name is required"
            }
        }
    }
    if (!email) {
        if (password.length < 8) {
            return {
                emailError: "email is required",
                passwordError: "password must be contain 8 charaters"
            }
        } else {
            return {
                emailError: "email is required"
            }
        }
    }
    if (!password || password.length < 8) {
        return {
            passwordError: "password must be contain 8 charaters"
        }
    }
    return null
}

export const forgotPasswordFormValidation = (email) => {
    if (!email) {
        return {
            emailError: "email is required"
        }
    }
    return null
}

export const resetPasswordFormValidation = (newPassword, confirmPassword) => {
    if (!newPassword && !confirmPassword) {
        return {
            newPasswordError: "password must contain 8 charaters",
            confirmPasswordError: "password is not match"
        }
    }
    if (!newPassword) {
        return {
            newPasswordError: "password must contain 8 charaters"
        }
    }
    if (!confirmPassword) {
        if (newPassword.length < 8) {
            return {
                newPasswordError: "password must contain 8 charaters",
                confirmPasswordError: "password is not match"
            }
        } else {
            return {
                confirmPasswordError: "password is not match"
            }
        }
    }
    if (newPassword !== confirmPassword) {
        if (newPassword.length < 8) {
            return {
                newPasswordError: "password must contain 8 charaters",
                confirmPasswordError: "password is not match"
            }
        } else {
            return {
                confirmPasswordError: "password is not match"
            }
        }
    }
    return null
}

export const changePasswordFormValidation = (oldPassword, newPassword) => {
    if (!oldPassword && !newPassword) {
        return {
            oldPasswordError: "old password is required",
            newPasswordError: "password must contain 8 charaters"
        }
    }
    if (!oldPassword) {
        if (newPassword.length < 8) {
            return {
                oldPasswordError: "old password is required",
                newPasswordError: "password must contain 8 charaters"
            }
        } else {
            return {
                oldPasswordError: "old password is required"
            }
        }
    }
    if (!newPassword) {
        return {
            newPasswordError: "password must contain 8 charaters"
        }
    }
    return null
}