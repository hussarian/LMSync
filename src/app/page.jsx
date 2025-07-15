"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoginForm from "@/components/auth/login-form"
import RegisterForm from "@/components/auth/register-form"
import WindowsActivation from "@/components/ui/windows-activation"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#2C3E50" }}>
      <Card className="w-full max-w-md mx-4" style={{ backgroundColor: '#ffffff' }}>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold" style={{ color: "#1ABC9C" }}>
            LMSync
          </CardTitle>
          <p className="text-sm" style={{ color: "#95A5A6" }}>
            학원 관리 시스템
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">로그인</TabsTrigger>
              <TabsTrigger value="register">
                계정 찾기
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <LoginForm />
            </TabsContent>

            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <WindowsActivation />
    </div>
  )
}
