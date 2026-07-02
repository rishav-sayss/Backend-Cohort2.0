"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

export default function Page() {

 let {hydrateUser} = useAuth()
  let router  = useRouter()
  let [formdata, setformdata] = useState({});
  function handelchange(e) {
    let { name, value } = e.target;

    setformdata({ ...formdata, [name]: value });
  }

  async function handelsubmit(e){
     e.preventDefault();
    try {
      let res =  await api.post("/api/auth/login",formdata)
      router.replace("/login")
      hydrateUser()
    } catch (error) {
      console.log("error in login", error)
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-5"  onSubmit={handelsubmit}  >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                onChange={handelchange}
                id="email"
                type="email"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                name={"password"}
                onChange={handelchange}
                id="password"
                type="password"
                placeholder="Enter your password"
              />
            </div>

            <Button className="w-full">Login</Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-primary hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
