/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthApiError } from '@supabase/supabase-js'

export function handleSupabaseError({
  error,
  customMessage
}: {
  error: any
  customMessage?: string
}): Error {
  if (process.env.NODE_ENV === 'development') {
    console.error('Supabase Error (Development Only):', error)
  }

  if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
    return new Error() // Return `null` instead of throwing an empty error
  }

  let userMessage =
    customMessage || 'An unexpected error occurred. Please try again later.'
  let statusCode: number | undefined
  let isUniqueConstraintViolation = false

  if (error instanceof AuthApiError) {
    statusCode = error.status
    if (!customMessage) {
      switch (error.code) {
        case 'email_exists':
          userMessage = 'This email is already registered.'
          break
        case 'email_not_confirmed':
          userMessage = 'Please confirm your email before logging in.'
          break
        case 'invalid_credentials':
          userMessage = 'Incorrect email or password.'
          break
        case 'user_not_found':
          userMessage = 'No user found with this email address.'
          break
        case 'weak_password':
          userMessage = 'The password is too weak. Please use a stronger one.'
          break
        case 'session_expired':
          userMessage = 'Your session has expired. Please log in again.'
          break
        case 'provider_email_needs_verification':
          userMessage = 'Your email needs to be verified.'
          break
        case 'user_banned':
          userMessage = 'Your account has been suspended.'
          break
        case 'too_many_requests':
        case 'over_request_rate_limit':
          userMessage = 'Too many requests. Please try again in a few minutes.'
          break
        default:
          if (process.env.NODE_ENV === 'development' && error.message) {
            userMessage = `Supabase Auth Error (${error.code}): ${error.message}`
          }
      }
    }
  } else if (typeof error === 'object' && error !== null) {
    if ('code' in error) {
      statusCode = parseInt(error.code as string, 10) || undefined
      // Specific detection of UNIQUE constraint violation (the code might vary depending on the database)
      if (
        statusCode === 23505 &&
        (error as any)?.message?.includes('violates unique constraint')
      ) {
        isUniqueConstraintViolation = true
        if (customMessage) {
          userMessage = customMessage // Use the custom message if provided for UNIQUE
        } else {
          userMessage =
            'A record with this value already exists. Please verify the information.'
        }
      } else if (
        statusCode === 23503 &&
        (error as any)?.message?.includes('violates foreign key constraint')
      ) {
        // Foreign key violation
        if (customMessage) {
          userMessage = customMessage // Use the custom message if provided for UNIQUE
        } else {
          userMessage =
            'This record is linked to another record. Please check the dependencies before deleting.'
        }
      } else if (
        !customMessage &&
        process.env.NODE_ENV === 'development' &&
        'message' in error
      ) {
        userMessage = (error as { message: string }).message
        if ('details' in error && (error as { details: string }).details) {
          userMessage += ` (${(error as { details: string }).details})`
        }
      }
    }
    if ('status' in error) {
      statusCode = error.status as number
    }
    // If it's not a UNIQUE error and no custom message, try to get a more specific message if available
    if (!isUniqueConstraintViolation && !customMessage && 'message' in error) {
      userMessage = (error as { message: string }).message
      if (
        process.env.NODE_ENV === 'development' &&
        'details' in error &&
        (error as { details: string }).details
      ) {
        userMessage += ` (${(error as { details: string }).details})`
      }
    }
  } else if (error instanceof Error && !customMessage) {
    // userMessage = error.message
    userMessage = 'eeeerrrrooor'
  }

  const enhancedError = new Error(userMessage)
  if (statusCode) {
    ;(enhancedError as any).statusCode = statusCode
  }
  ;(enhancedError as any).isUniqueConstraintViolation =
    isUniqueConstraintViolation
  return enhancedError
}
