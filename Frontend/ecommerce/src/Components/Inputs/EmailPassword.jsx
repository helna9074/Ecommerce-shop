import React from 'react'

const EmailPassword = () => {
  return (
    <div>
       <Input placeholder="Email" type="email" {...register("email")} />
                    {errors.email && <p className="text-red-500 font-light text-xs">{errors.email.message}</p>}
                    
                    <Input
                      placeholder="password"
                      type="password"
                      {...register("password")}
                    />
                    {errors.password && <p className="text-red-500 font-light text-xs">{errors.password.message}</p>}
    </div>
  )
}

export default EmailPassword

