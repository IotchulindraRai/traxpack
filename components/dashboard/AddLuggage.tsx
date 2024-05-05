"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { LuggageSchema } from "@/zod/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { luggageRegister } from "@/actions/addrfid";


export default function AddLuggage() {

  const [ error, setError ] = useState<string | undefined>("");
  const [ success, setSuccess ] = useState<string | undefined>("");
  const [ isPending, startTransition ] = useTransition();


  const form = useForm<z.infer<typeof LuggageSchema>>({
    resolver: zodResolver(LuggageSchema),
    defaultValues: {
      rfid:"",
      luggageName:""
    },
  });

  const onSubmit = (values: z.infer<typeof LuggageSchema>) => {
    setError("");
    setSuccess("");
    startTransition(()=>{
      luggageRegister(values)
            .then((data)=>{
                setError(data.error);
                setSuccess(data.success);
            })
    });
  }
  return (
    <Card className="w-[400px] shadow-md">
        <CardHeader className="text-2xl font-bold justify-center flex items-center">
             Add Luggage
        </CardHeader>
        <CardContent>
        <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                >
                    <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="rfid"
                        render={({ field })=>(
                            <FormItem>
                                <FormLabel>RFID Tag</FormLabel>
                                <FormControl>
                                    <Input
                                    {...field}
                                    disabled={isPending}
                                    placeholder="Luggage RFID Tag"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="luggageName"
                        render={({ field })=>(
                            <FormItem>
                                <FormLabel>Luggage Name</FormLabel>
                                <FormControl>
                                    <Input
                                    {...field}
                                    disabled={isPending}
                                    placeholder="Luggage Name"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                      </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button type="submit" className="w-full" disabled={isPending}>
                        Add Luggage
                    </Button>
                </form>
            </Form>
        </CardContent>
    </Card>
  )
}
