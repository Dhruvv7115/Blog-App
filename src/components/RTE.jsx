import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
	return (
		<div className="w-full z-0">
			{label && <label className="inline-block pl-1 mb-1">{label}</label>}
			<Controller
				name={name || "content"}
				control={control}
				render={({ field }) => (
					<Editor
					  apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
						initialValue={
							defaultValue || <p>This is the initial content of the editor.</p>
						}
						init={{
							min_height: 300,
							max_height: 600,
							menubar: true,
							plugins: [
								"advlist",
								"autolink",
								"lists",
								"link",
								"image",
								"charmap",
								"preview",
								"anchor",
								"searchreplace",
								"visualblocks",
								"code",
								"fullscreen",
								"insertdatetime",
								"media",
								"table",
								"code",
								"help",
								"wordcount",
							],
							toolbar:
								"undo redo | blocks | bold italic forecolor | alignleft aligncenter | alignright alignjustify | bullist numlist outdent indent | removeformat | help",
							content_style:
								"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
						}}
						onEditorChange={(content) => field.onChange(content)}
					/>
				)}
			/>
		</div>
	);
}
