
import React, { useState } from "react";
import { Text } from "./validations";
import { twMerge } from "tailwind-merge";
import { sendEmail } from "./send";

type FormData = {
  name: string
  email: string
  message: string
}

const Form: React.FC = () => {
  // Placeholders by input keys
  const placeholders: Record<keyof FormData, string> = {
    name: 'Enter your name.',
    email: 'Enter your email.',
    message: 'Write your message.'
  }
  
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [isError, setIsError] = useState<string>("");
  const [errorLocation, setErrorLocation] = useState<
    keyof FormData | ""
  >("");
  const [isSending, setIsSending] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorLocation("");
    setIsError("");
    setIsSending(true);

    if (
      new Text(formData.name).isEmpty()) {
      setErrorLocation("name");
      setIsError("성함 칸이 비어있습니다.");
      setIsSending(false);
      return;
    }
    if (new Text(formData.name).atLeast(2)) {
      setErrorLocation("name");
      setIsError("성함은 최소 2자 이상이여야 합니다.");
      setIsSending(false);
      return;
    }

    if (!(new Text(formData.email).isEmail())) {
      setErrorLocation("email");
      setIsError("올바른 이메일을 입력해주세요.");
      setIsSending(false);
      return;
    }

    if (new Text(formData.email).isEmpty()) {
      setErrorLocation("email");
      setIsError("이메일 칸이 비어있습니다.");
      setIsSending(false);
      return;
    }
    if (new Text(formData.email).atLeast(5)) {
      setErrorLocation("email");
      setIsError("이메일은 최소 4자 이상이여야 합니다.");
      setIsSending(false);
      return;
    }

    if (new Text(formData.message).isEmpty()) {
      setErrorLocation("message");
      setIsError("메세지 칸이 비어있습니다.");
      setIsSending(false);
      return;
    }
    if (new Text(formData.message).atLeast(10)) {
      setErrorLocation("message");
      setIsError("메세지 최소 10자 이상이여야 합니다.");
      setIsSending(false);
      return;
    }

    const sent = await sendEmail(formData) 

    if (!sent) {
      // if response failed to send
      setIsSending(false)
      return
    }
    // if response success to send
    setIsSending(false)
    return
  }

  return (
    <article>
      <h3 className="font-bold text-2xl md:text-3xl lg:text-4xl mb-3.5 lg:mb-5">
        &apos;질문&apos; 있으신가요?
      </h3>
      <p className="text-lg lg:text-xl leading-[1.67] lg:leading-[1.67] text-neutral-400 mb-8 lg:mb-10">
        아래 질문을 작성해주시고 보내주시면,{" "}
        <span className="inline-block">
          빠른 시일 내에 답변드리도록 하겠습니다.
        </span>
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-4 lg:gap-y-6 w-full sm:w-max sm:min-w-[375px]"
      >
        <div className="w-auto flex flex-col gap-y-1.5 lg:gap-y-2.5">
          <input
            value={formData.name}
            onChange={(e) =>
              setFormData((f) => ({
                ...f,
                name: e.target.value,
              }))
            }
            type="text"
            className={twMerge(
              "w-full bg-neutral-800 rounded px-4 py-2.5 text-lg focus:placeholder:text-neutral-400",
              isError && errorLocation === "name"
                ? "border-red-400"
                : "border-neutral-400"
            )}
            placeholder={placeholders.name}
          />
          {isError && errorLocation === "name" && (
            <p className="text-xs lg:text-sm font-medium text-red-300 animate-pulse">
              *{isError}
            </p>
          )}
        </div>
        <div className="w-auto flex flex-col gap-y-1.5 lg:gap-y-2.5">
          <input
            value={formData.email}
            onChange={(e) =>
              setFormData((f) => ({
                ...f,
                  email: e.target.value,
              }))
            }
            type="text"
            className={twMerge(
              "w-full bg-neutral-800 rounded px-4 py-2.5 text-lg focus:placeholder:text-neutral-400",
              isError && errorLocation === "email"
                ? "border-red-400"
                : "border-neutral-400"
            )}
            placeholder={placeholders.email}
          />
          {isError && errorLocation === "email" && (
            <p className="text-xs lg:text-sm font-medium text-red-300 animate-pulse">
              *{isError}
            </p>
          )}
        </div>
        <div className="w-auto flex flex-col gap-y-1.5 lg:gap-y-2.5">
          <textarea
            rows={6}
            value={formData.message}
            onChange={(e) =>
              setFormData((f) => ({
                ...f,
                message: e.target.value,
              }))
            }
            className={twMerge(
              "w-auto bg-neutral-800 border-neutral-400 rounded px-4 py-2.5 text-lg focus:placeholder:text-neutral-400",
              isError && errorLocation === "message"
                ? "border-red-400"
                : "border-neutral-400"
            )}
            placeholder={placeholders.message}
          />
          {isError && errorLocation === "message" && (
            <p className="text-xs lg:text-sm font-medium text-red-300 animate-pulse">
              *{isError}
            </p>
          )}
        </div>

        {isSending ? (
          <div>
            <span className="w-[37.5px] h-[37.5px] mx-auto rounded-full p-1 bg-white flex justify-center items-center animate-pulse">
              <span className="w-full h-full rounded-full bg-neutral-900" />
            </span>
          </div>
        ) : (
          <button
            type="submit"
            className="px-8 py-4 w-auto border rounded bg-neutral-500/10 border-neutral-500 text-white font-medium text-lg lg:text-xl lg:hover:bg-white/10 lg:hover:border-white/25 lg:hover:text-white"
          >
            메세지 보내기
          </button>
        )}
      </form>
    </article>
  );
};

export default Form;