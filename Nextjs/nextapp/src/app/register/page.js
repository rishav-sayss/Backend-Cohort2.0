"use client";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { api } from "@/lib/api";
export default function Page() {
  let [formdata, setformdata] = useState({});

  function handelchange(e) {
    let { name, value } = e.target;

    setformdata({ ...formdata, [name]: value });
  }

    async function handelsubmit(e){
      e.preventDefault()
      try {
        let res =  await api.post("/api/auth/register",formdata)
        console.log(res)
      } catch (error) {
        console.log("error in login", error)
      }
  
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Register</CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-5" onSubmit={handelsubmit} >
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                onChange={handelchange}
                id="name"
                type="text"
                placeholder="Enter your name"
              />
            </div>

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
                name="password"
                onChange={handelchange}
                id="password"
                type="password"
                placeholder="Create password"
              />
            </div>

            <Button className="w-full">Register</Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
