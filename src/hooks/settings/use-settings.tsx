"use client";
import {
  onChatBotImageUpdate,
  onCreateFilterQuestions,
  onCreateHelpDeskQuestion,
  onDeleteUserDomain,
  onGetAllFilterQuestions,
  onGetAllHelpDeskQuestions,
  onUpdateDomain,
  onUpdatePassword,
  onUpdateWelcomeMessage,
} from "@/actions/settings/index.";
import { useToast } from "@/components/ui/use-toast";
import {
  ChangePasswordProps,
  ChangePasswordSchema,
} from "@/schemas/auth-schema";
import {
  DomainSettingsProps,
  DomainSettingsSchema,
  FilterQuestionsProps,
  FilterQuestionsSchema,
  HelpDeskQuestionsProps,
  HelpDeskQuestionsSchema,
} from "@/schemas/settings.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import { UploadClient } from "@uploadcare/upload-client";

const upload = new UploadClient({
  publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string,
  // secureSignature: process.env.UPLOAD_CARE_SECRET_KEY,
});

export const useThemeMode = () => {
  const { setTheme, theme } = useTheme();

  return {
    setTheme,
    theme,
  };
};

export const useChangePassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordProps>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: "onChange",
  });

  const { toast } = useToast();

  const onChangePassword = handleSubmit(async (values) => {
    try {
      setLoading(true);
      const updated = await onUpdatePassword(values.password);

      if (updated) {
        reset();
        toast({
          title: "Başarılı",
          description: updated.message,
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  });

  return {
    register,
    errors,
    onChangePassword,
    loading,
  };
};

export const useSettings = (id: string) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DomainSettingsProps>({
    resolver: zodResolver(DomainSettingsSchema),
  });
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const onUpdateSettings = handleSubmit(async (values) => {
    setLoading(true);


    try {
      if (values.domain) {
        const domain = await onUpdateDomain(id, values.domain);

        if (domain) {
          toast({
            title: "Başarılı",
            description: domain.message,
          });
        }
      }

      if (values.image[0]) {
        const uploaded = await upload.uploadFile(values.image[0]);
        const image = await onChatBotImageUpdate(id, uploaded.uuid);

        if (image) {
          toast({
            title: image.status === 200 ? "Başarılı" : "Hata",
            description: image.message,
          });
        }
      }

      if (values.welcomeMessage) {
        const message = await onUpdateWelcomeMessage(values.welcomeMessage, id);
        if (message) {
          toast({
            title: "Başarılı",
            description: message.message,
          });
        }
      }

      reset();
      if(values?.domain) {
       return  router.push(`/settings/${values?.domain?.split('.')[0]}`)
      }
      router.refresh();

    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  });

  const onDeleteDomain = async () => { 
    setDeleting(true);

    const deleted = await onDeleteUserDomain(id);

    if(deleted) {
      toast({
        title: 'Başarılı',
        description: deleted.message
      })

      setDeleting(false);
      router.refresh();

    }


  }


  return {
    register,
    onUpdateSettings,
    errors,
    loading,
    onDeleteDomain,
    deleting
  }
};



export const useHelpDesk = (id:string) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm<HelpDeskQuestionsProps>({
    resolver: zodResolver(HelpDeskQuestionsSchema)
  })
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [isQuestions, setIsQuestions] = useState<{
    id: string;
    question: string;  
    answer: string
  }[]>([])

  const onSubmitQuestion = handleSubmit(async (values) => {
    setLoading(true)
    const question = await onCreateHelpDeskQuestion(
      id,
      values.question,
      values.answer
    )

    if(question) {
      setIsQuestions(question.questions!)
      toast({
        title: question.status == 200 ? 'Başarılı' : 'Hata',
        description: question.message
      })
      
      reset({
        answer:'',
        question:''
      })
    }
    setLoading(false)


  })

  const onGetQuestions = async () => {
    setLoading(true);

    const questions = await onGetAllHelpDeskQuestions(id) 
    if(questions) {
      setIsQuestions(questions.questions)
    }

    setLoading(false)

  }

  useEffect(() => {
    onGetQuestions();
  }, [])
  

  return {
    register,
    onSubmitQuestion,
    errors,
    isQuestions,
    loading,
  }


}



export const useFilterQuestions = (id:string) => {
    const {
      register,
      handleSubmit,
      formState: {errors},
      reset
    } = useForm<FilterQuestionsProps>({
      resolver: zodResolver(FilterQuestionsSchema)
    })
    const { toast } = useToast();
    const [loading, setLoading] = useState<boolean>(false);
    const [isQuestions, setIsQuestions] = useState<
    {
      id:string;
      question:string;
    }[]
    >([])

    const onAddFilterQuestions = handleSubmit( async (values) => {
      setLoading(true)
      const questions = await onCreateFilterQuestions(id, values.question);

      if(questions) {
        setIsQuestions(questions.questions!)
        toast({
          title: questions.status === 200 ? 'Başarılı' : 'Hata',
          description: questions.message
        })
        reset();
        setLoading(false)
      }
    })

    const onGetQuestions = async () => {
      setLoading(true)

      const questions = await onGetAllFilterQuestions(id);

      if(questions) {
        setIsQuestions(questions.questions)
        setLoading(false)
      }
    }

    useEffect(() => {
      onGetQuestions();
    }, [])



    return {
      loading,
      onAddFilterQuestions,
      register,
      errors,
      isQuestions
    }


    


 }