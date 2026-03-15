from reportlab.pdfgen import canvas

file_path = r"d:\reasearch_papers\test_sample_paper.pdf"
c = canvas.Canvas(file_path)
c.drawString(100, 750, "Sample AI Research Paper")
c.drawString(100, 700, "Abstract: AI is great and this paper introduces a new model.")
c.drawString(100, 650, "Technologies Used: Python, FastAPI, React.")
c.drawString(100, 600, "Key Contributions: We achieved a 20% accuracy boost.")
c.save()
print(f"PDF created successfully at {file_path}")
