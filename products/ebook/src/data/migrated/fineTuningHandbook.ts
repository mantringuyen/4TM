import { Book } from '../../types';

export const FINE_TUNING_HANDBOOK_BOOK: Book = {
  id: 'fine-tuning-handbook',
  slug: 'fine-tuning-handbook',
  title: 'LLM Fine-Tuning & Parameter-Efficient Tuning (LoRA)',
  subtitle: {
    en: 'LoRA, QLoRA, Dataset Curation & Instruction Tuning Mechanics',
    vi: 'Kỹ Thuật LoRA, QLoRA, Chuẩn Bị Dataset & Tinh Chỉnh Instruction Tuning',
  },
  bookType: 'Handbook',
  categoryId: 'ai',
  subjectId: 'ai',
  author: '4TM Technical Board',
  role: 'LLM Training & Model Adaptation Engineering Group',
  level: 'Intermediate to Advanced',
  estimatedReadTime: '40 mins',
  chaptersCount: 2,
  publishedDate: '2025-02-14',
  accentColor: 'from-amber-600 to-orange-900',
  tags: ['Fine-Tuning', 'LoRA', 'QLoRA', 'PEFT', 'Instruction Tuning', 'Handbook'],
  description: {
    en: 'An authoritative engineering handbook on parameter-efficient fine-tuning (PEFT): mathematical foundations of Low-Rank Adaptation (LoRA), QLoRA 4-bit NormalFloat (NF4) quantization, double quantization, paged optimizers, instruction dataset curation, and response loss masking.',
    vi: 'Cẩm nang kỹ thuật chuyên sâu về tinh chỉnh mô hình ngôn ngữ tối ưu tham số (PEFT): nền tảng toán học của Low-Rank Adaptation (LoRA), lượng tử hóa 4-bit NormalFloat (NF4) trong QLoRA, lượng tử hóa kép, paged optimizer, chuẩn bị tập dữ liệu instruction và cơ chế che nhãn loss masking.',
  },
  prerequisites: {
    en: [
      'Linear algebra proficiency (matrix multiplication, rank, dimensionality, tensor shapes)',
      'Understanding of standard Transformer architecture, self-attention, and PyTorch training loops',
    ],
    vi: [
      'Nắm vững đại số tuyến tính (phép nhân ma trận, hạng của ma trận, số chiều, chiều tensor)',
      'Hiểu biết về kiến trúc Transformer, cơ chế self-attention và vòng lặp huấn luyện PyTorch',
    ],
  },
  outcomes: {
    en: [
      'Master the mathematical derivation of Low-Rank Adaptation (LoRA) weight decomposition and forward pass mechanics',
      'Deploy QLoRA with 4-bit NF4 base quantization, double quantization, and paged optimizers on consumer GPU hardware',
      'Structure clean instruction tuning datasets using standardized ChatML, Alpaca, or ShareGPT formats',
      'Implement response-only cross-entropy loss masking to prevent model capacity degradation on prompt tokens',
    ],
    vi: [
      'Làm chủ công thức toán học phân rã trọng số Low-Rank Adaptation (LoRA) và cơ chế lan truyền thuận forward pass',
      'Triển khai QLoRA với lượng tử hóa 4-bit NF4, lượng tử hóa kép và paged optimizer trên phần cứng GPU phổ thông',
      'Định dạng tập dữ liệu instruction chuẩn mực theo định dạng ChatML, Alpaca hoặc ShareGPT',
      'Hiện thực cơ chế che nhãn response loss masking để tránh lãng phí năng lực mô hình vào việc học vẹt prompt',
    ],
  },
  chapters: [
    {
      id: 'fth-ch-1',
      number: 1,
      slug: 'lora-and-qlora-mechanics',
      title: {
        en: 'Low-Rank Adaptation (LoRA) & QLoRA Mechanics',
        vi: 'Cơ Chế Kỹ Thuật Low-Rank Adaptation (LoRA) & QLoRA',
      },
      summary: {
        en: 'Freezing base weights W_0, low-rank decomposition matrices B and A, 4-bit NF4 quantization, and gradient backpropagation.',
        vi: 'Đóng băng trọng số gốc W_0, ma trận phân rã hạng thấp B và A, lượng tử hóa 4-bit NF4 và lan truyền ngược gradient.',
      },
      readTimeMinutes: 20,
      sections: [
        {
          id: 'fth-1-1',
          title: {
            en: 'Mathematical Principles of Low-Rank Adaptation (LoRA) & QLoRA',
            vi: 'Nguyên Lý Toán Học Của Low-Rank Adaptation (LoRA) & QLoRA',
          },
          keyIdea: {
            en: 'Full fine-tuning updates all base weights, requiring massive VRAM. LoRA freezes W_0 and updates via Delta W = (alpha/r) * B * A, slashing trainable parameters by >99% while matching full fine-tuning performance.',
            vi: 'Full fine-tuning cập nhật toàn bộ trọng số gốc, đòi hỏi lượng VRAM khổng lồ. LoRA đóng băng W_0 và cập nhật qua Delta W = (alpha/r) * B * A, giảm hơn 99% tham số huấn luyện mà vẫn đạt chất lượng tương đương.',
          },
          content: {
            en: 'During pre-training, foundation LLM weight matrices $W_0 \\in \\mathbb{R}^{d_{\\text{out}} \\times d_{\\text{in}}}$ have full rank. However, empirical studies reveal that adapting a pre-trained model to specific downstream tasks exhibits a very low "intrinsic dimension". Rather than updating all billions of parameters directly (which requires storing optimizer states in FP32 for every weight, multiplying VRAM requirements by 4x to 8x), LoRA freezes the original base weights $W_0$ and constrains parameter updates by parameterizing them through a low-rank decomposition: $\\Delta W = \\frac{\\alpha}{r} (B \\times A)$, where $B \\in \\mathbb{R}^{d_{\\text{out}} \\times r}$ and $A \\in \\mathbb{R}^{r \\times d_{\\text{in}}}$, with rank $r \\ll \\min(d_{\\text{out}}, d_{\\text{in}})$. At initialization, matrix $A$ is initialized from a Gaussian distribution $\\mathcal{N}(0, \\sigma^2)$, while matrix $B$ is initialized strictly to zero, ensuring $\\Delta W = 0$ at the start of training so model behavior is initially identical to the pre-trained checkpoint. For any input token vector $x$, the forward pass computes: $h = W_0 x + \\Delta W x = W_0 x + \\frac{\\alpha}{r} B (A x)$, where $\\alpha$ is a scaling hyperparameter (typically set to $\\alpha = 2r$ to keep scaling stable when tuning $r$). QLoRA (Quantized LoRA) pushes memory savings further by quantizing frozen base model weights into 4-bit NormalFloat (NF4), adding Double Quantization (quantizing the quantization constants themselves), and using Paged Optimizers to manage GPU memory allocation spikes.',
            vi: 'Trong giai đoạn pre-training, các ma trận trọng số $W_0 \\in \\mathbb{R}^{d_{\\text{out}} \\times d_{\\text{in}}}$ của mô hình nền tảng có hạng đầy đủ (full rank). Tuy nhiên, nghiên cứu thực nghiệm chứng minh rằng quá trình tinh chỉnh mô hình cho các tác vụ chuyên biệt chỉ cần một "số chiều nội tại" (intrinsic dimension) rất nhỏ. Thay vì cập nhật trực tiếp hàng tỷ tham số (đòi hỏi lưu trữ trạng thái optimizer ở định dạng FP32 cho từng trọng số, làm tăng VRAM gấp 4 đến 8 lần), LoRA đóng băng hoàn toàn trọng số gốc $W_0$ và biểu diễn biến thiên trọng số thông qua phép phân rã hạng thấp: $\\Delta W = \\frac{\\alpha}{r} (B \\times A)$, trong đó $B \\in \\mathbb{R}^{d_{\\text{out}} \\times r}$ và $A \\in \\mathbb{R}^{r \\times d_{\\text{in}}}$, với hạng $r \\ll \\min(d_{\\text{out}}, d_{\\text{in}})$. Khi khởi tạo, ma trận $A$ được gán ngẫu nhiên theo phân phối chuẩn Gaussian $\\mathcal{N}(0, \\sigma^2)$, trong khi ma trận $B$ được gán bằng 0 tuyệt đối, đảm bảo $\\Delta W = 0$ ngay trước khi huấn luyện để mô hình giữ nguyên hành vi gốc. Với mọi vector đầu vào $x$, phép tính lan truyền thuận thực hiện: $h = W_0 x + \\Delta W x = W_0 x + \\frac{\\alpha}{r} B (A x)$, trong đó $\\alpha$ là hệ số tỷ lệ scaling (thường chọn $\\alpha = 2r$ để giữ tỷ lệ cập nhật ổn định). QLoRA (Quantized LoRA) đẩy khả năng tiết kiệm bộ nhớ lên tầm cao mới bằng cách lượng tử hóa trọng số gốc sang định dạng 4-bit NormalFloat (NF4), bổ sung Lượng tử hóa kép (lượng tử hóa luôn các hằng số tỷ lệ) và dùng Paged Optimizer để quản lý các đỉnh nhọn bộ nhớ GPU.',
          },
          comparisonTable: {
            headers: [
              { en: 'Adaptation Method', vi: 'Phương Pháp Tinh Chỉnh' },
              { en: 'Trainable Params (%)', vi: 'Tỷ Lệ Tham Số Huấn Luyện (%)' },
              { en: 'Base Weight Precision', vi: 'Độ Chính Xác Trọng Số Gốc' },
              { en: 'VRAM for 70B Model', vi: 'Dung Lượng VRAM Cho Bản 70B' },
              { en: 'Adapter Modularity', vi: 'Tính Đóng Gói Adapter' },
            ],
            rows: [
              {
                en: ['Full Fine-Tuning (FFT)', '100% (70 Billion)', 'FP16 or BF16 (16-bit)', '~1,120 GB (Multi-Node H100)', 'None (Must store full 140GB checkpoint per task)'],
                vi: ['Full Fine-Tuning (FFT)', '100% (70 Tỷ tham số)', 'FP16 hoặc BF16 (16-bit)', '~1.120 GB (Cụm nhiều node H100)', 'Không (Phải lưu checkpoint 140GB cho mỗi tác vụ)'],
              },
              {
                en: ['Standard LoRA', '0.1% to 1.0% (~100-300M)', 'FP16 or BF16 (16-bit)', '~160 GB (2x 80GB A100)', 'High (~200MB adapter file easily swapped)'],
                vi: ['Standard LoRA', '0.1% đến 1.0% (~100-300M)', 'FP16 hoặc BF16 (16-bit)', '~160 GB (2x 80GB A100)', 'Rất cao (File adapter ~200MB thay thế dễ dàng)'],
              },
              {
                en: ['QLoRA (NF4 + Double Quant)', '0.1% to 1.0% (~100-300M)', '4-bit NormalFloat (NF4)', '~48 GB (Single RTX 6000 / A6000)', 'High (~200MB adapter file trained on consumer GPU)'],
                vi: ['QLoRA (NF4 + Lượng tử kép)', '0.1% đến 1.0% (~100-300M)', '4-bit NormalFloat (NF4)', '~48 GB (Chỉ cần 1 GPU RTX 6000 / A6000)', 'Rất cao (File adapter ~200MB chạy trên GPU phổ thông)'],
              },
            ],
          },
          diagram: {
            title: {
              en: 'LoRA Forward Pass Computation Graph',
              vi: 'Đồ Thị Tính Toán Lan Truyền Thuận Trong LoRA',
            },
            steps: [
              {
                number: 1,
                label: { en: 'Input Vector x', vi: 'Vector Đầu Vào x' },
                description: {
                  en: 'Token activation vector x with dimension d_in arrives at linear layer.',
                  vi: 'Vector kích hoạt token x có số chiều d_in đi vào tầng tuyến tính.',
                },
              },
              {
                number: 2,
                label: { en: 'Parallel Stream: Frozen W_0', vi: 'Nhánh Song Song: Trọng Số Gốc W_0 Đóng Băng' },
                description: {
                  en: 'Base weights W_0 (d_out x d_in) compute baseline representation h_base = W_0 * x with zero gradient calculation.',
                  vi: 'Trọng số gốc W_0 (d_out x d_in) tính biểu diễn nền h_base = W_0 * x mà không cần tính đạo hàm gradient.',
                },
              },
              {
                number: 3,
                label: { en: 'Parallel Stream: LoRA Decomposition', vi: 'Nhánh Song Song: Phân Rã Hạng Thấp LoRA' },
                description: {
                  en: 'Trainable matrix A (r x d_in) compresses x into rank r, then matrix B (d_out x r) projects back to d_out: (alpha/r) * B * (A * x).',
                  vi: 'Ma trận huấn luyện A (r x d_in) nén x về hạng r, sau đó ma trận B (d_out x r) chiếu ngược lại d_out: (alpha/r) * B * (A * x).',
                },
              },
              {
                number: 4,
                label: { en: 'Addition & Output Merge', vi: 'Phép Cộng & Hợp Nhất Đầu Ra' },
                description: {
                  en: 'Both streams sum together: h = W_0 * x + (alpha / r) * B * A * x. At deployment, B*A can be permanently folded into W_0.',
                  vi: 'Cộng hai luồng: h = W_0 * x + (alpha / r) * B * A * x. Khi deploy có thể gộp vĩnh viễn B*A vào W_0 để không tăng độ trễ.',
                },
              },
            ],
          },
          codeBlock: {
            language: 'python',
            filename: 'training/qlora_peft_setup.py',
            explanation: {
              en: 'Production PyTorch QLoRA setup using HuggingFace PEFT and BitsAndBytes for 4-bit NF4 training.',
              vi: 'Cấu hình QLoRA chuẩn sản xuất bằng PyTorch kết hợp HuggingFace PEFT và BitsAndBytes để huấn luyện 4-bit NF4.',
            },
            code: `import torch
from transformers import AutoModelForCausalLM, BitsAndBytesConfig
from peft import LoraConfig, get_peft_model, TaskType, prepare_model_for_kbit_training

# 1. Configure 4-bit NormalFloat (NF4) with Double Quantization
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",           # Optimal quantile quantization for Gaussian weights
    bnb_4bit_compute_dtype=torch.bfloat16, # Compute gradients in BF16 precision
    bnb_4bit_use_double_quant=True,       # Quantize quantization constants (saves ~0.37 bits/param)
)

# 2. Load base model with device map
model_id = "meta-llama/Llama-3-8B"
base_model = AutoModelForCausalLM.from_pretrained(
    model_id,
    quantization_config=bnb_config,
    device_map="auto"
)

# 3. Prepare model for k-bit training (casts layernorms to FP32, enables gradient checkpointing)
base_model = prepare_model_for_kbit_training(base_model)

# 4. Configure LoRA hyperparameters
peft_config = LoraConfig(
    r=16,                                 # Rank: rank of low-rank matrices (r << d)
    lora_alpha=32,                        # Scaling factor: alpha / r = 32 / 16 = 2.0
    target_modules=[
        "q_proj", "k_proj", "v_proj", "o_proj",   # Attention projections
        "gate_proj", "up_proj", "down_proj"       # MLP feed-forward projections
    ],
    lora_dropout=0.05,
    bias="none",
    task_type=TaskType.CAUSAL_LM
)

# 5. Inject trainable LoRA adapter layers
model = get_peft_model(base_model, peft_config)
model.print_trainable_parameters()
# Output: trainable params: 41,943,040 || all params: 8,072,204,288 || trainable%: 0.5196%`,
          },
          deepDive: {
            title: {
              en: 'Why NF4 Quantization Outperforms Standard FP4',
              vi: 'Tại Sao Lượng Tử Hóa NF4 Vượt Trội Hơn FP4 Tiêu Chuẩn',
            },
            content: {
              en: 'Standard 4-bit floating point (FP4) divides quantization bins uniformly across linear intervals. However, deep neural network weights follow a bell-shaped Gaussian distribution centered at zero. Uniform quantization wastes precious 4-bit states in the tail regions where very few weights exist, while creating high quantization distortion in the dense central region. NormalFloat4 (NF4) constructs quantization bins by mapping exact quantiles of a theoretical standard normal distribution $\\mathcal{N}(0, 1)$, ensuring every quantization bin contains an equal probability mass of weights. This information-theoretically optimal design preserves model accuracy with virtually zero degradation compared to full 16-bit weights.',
              vi: 'Định dạng 4-bit floating point (FP4) tiêu chuẩn chia các khoảng lượng tử hóa đều nhau trên dải tuyến tính. Tuy nhiên, trọng số mạng nơ-ron sâu luôn tuân theo phân phối chuẩn Gaussian hình chuông có đỉnh tại 0. Lượng tử hóa đều sẽ lãng phí các trạng thái 4-bit quý giá vào phần đuôi (nơi có rất ít trọng số) nhưng lại gây ra sai số lớn ở vùng trung tâm (nơi tập trung phần lớn trọng số). NormalFloat4 (NF4) xây dựng các khoảng lượng tử dựa trên phân vị xác suất của phân phối chuẩn $\\mathcal{N}(0, 1)$, đảm bảo mỗi khoảng lượng tử chứa lượng trọng số có xác suất bằng nhau. Thiết kế tối ưu theo lý thuyết thông tin này giúp bảo toàn năng lực mô hình mà hầu như không suy giảm chất lượng so với trọng số 16-bit gốc.',
            },
          },
          bestPractices: {
            en: [
              'Target all linear layers (both attention and MLP projections) for maximum downstream task adaptation quality.',
              'Keep the ratio alpha / r constant (typically 2.0 or 1.0) when experimenting with different rank values.',
              'Use bfloat16 for the compute dtype on Ampere and newer GPUs (A100, H100, RTX 3090/4090) to prevent numeric underflow.',
              'At inference time, merge the LoRA adapters into base weights using model.merge_and_unload() to eliminate runtime latency overhead.',
            ],
            vi: [
              'Áp dụng LoRA lên toàn bộ các tầng tuyến tính (cả attention và MLP) để đạt chất lượng thích ứng tác vụ cao nhất.',
              'Giữ nguyên tỷ số alpha / r (thường là 2.0 hoặc 1.0) khi thử nghiệm thay đổi các giá trị rank r khác nhau.',
              'Dùng định dạng bfloat16 làm compute dtype trên kiến trúc GPU Ampere trở lên (A100, H100, RTX 3090/4090) để chống tràn số dưới.',
              'Khi triển khai inference thực tế, hãy gộp adapter vào trọng số gốc bằng lệnh model.merge_and_unload() để triệt tiêu độ trễ chạy phụ.',
            ],
          },
          keyTakeaways: {
            en: [
              'LoRA updates weights through Delta W = (alpha / r) * B * A, requiring 99% fewer trainable parameters than full fine-tuning.',
              'QLoRA quantizes base weights into 4-bit NF4 while backpropagating gradients into 16-bit LoRA adapter matrices.',
              'Double Quantization and Paged Optimizers enable fine-tuning 70B models on accessible single-GPU hardware.',
            ],
            vi: [
              'LoRA cập nhật trọng số qua Delta W = (alpha / r) * B * A, giảm hơn 99% tham số cần huấn luyện so với full fine-tuning.',
              'QLoRA lượng tử hóa trọng số gốc sang 4-bit NF4 trong khi vẫn lan truyền ngược gradient vào các ma trận adapter 16-bit.',
              'Lượng tử hóa kép và Paged Optimizer cho phép huấn luyện mô hình 70B ngay trên phần cứng đơn GPU phổ thông.',
            ],
          },
        },
      ],
    },
    {
      id: 'fth-ch-2',
      number: 2,
      slug: 'dataset-curation-instruction-tuning',
      title: {
        en: 'Dataset Curation & Instruction Formatting',
        vi: 'Xử Lý Tập Dữ Liệu & Định Dạng Instruction Tuning',
      },
      summary: {
        en: 'Instruction tuning pipelines, JSONL formatting, Alpaca vs ShareGPT vs ChatML tokenization, and response loss masking.',
        vi: 'Quy trình tinh chỉnh chỉ dẫn, định dạng JSONL, so sánh Alpaca vs ShareGPT vs ChatML và cơ chế che nhãn loss masking.',
      },
      readTimeMinutes: 20,
      sections: [
        {
          id: 'fth-2-1',
          title: {
            en: 'Instruction Dataset Engineering & ChatML Tokenization',
            vi: 'Kỹ Thuật Xây Dựng Tập Dữ Liệu Instruction & Chuẩn ChatML',
          },
          keyIdea: {
            en: 'Dataset quality decisively trumps dataset quantity. 1,000 meticulously verified instruction pairs consistently outperform 100,000 noisy samples. Crucially, calculate loss strictly on assistant response tokens using loss masking (label = -100).',
            vi: 'Chất lượng tập dữ liệu quyết định sự thành bại hơn số lượng. 1.000 cặp instruction chuẩn mực luôn đánh bại 100.000 mẫu dữ liệu ồn ào. Quan trọng nhất, chỉ tính hàm mất mát loss trên token câu trả lời của trợ lý bằng kỹ thuật loss masking (label = -100).',
          },
          content: {
            en: 'Instruction Tuning aligns an auto-regressive next-token predictor into a conversational model that reliably follows task specifications. Across modern fine-tuning research (such as LIMA - Less Is More for Alignment), it has been conclusively proven that a small dataset of 1,000 carefully curated, diverse, and human-verified examples yields superior alignment compared to 100,000 synthetically generated or scraped examples filled with formatting artifacts and repetitive patterns. Data formatting is typically managed via standard templates: Alpaca-style (`instruction`, `input`, `output`), ShareGPT-style (`conversations` with multi-turn speaker turns), or ChatML format (`<|im_start|>system...<|im_end|>`). It is critical to recognize that different foundation models employ different native chat tokenizers: Llama-3 utilizes special header tokens (`<|start_header_id|>user<|end_header_id|>`), Mistral uses `[INST] ... [/INST]`, and Qwen uses ChatML. Beyond formatting, the single most critical engineering requirement in instruction tuning is **Loss Masking (Response-Only Training)**: during cross-entropy loss computation, all system prompts and user query tokens must have their target label set to `-100` (the standard PyTorch `ignore_index`). If loss masking is omitted and loss is computed across the entire prompt, the model wastes gradient updates memorizing user phrasing and prompt syntax rather than learning how to reason and generate the solution.',
            vi: 'Instruction Tuning là quá trình căn chỉnh mô hình sinh từ tự hồi quy thành một trợ lý đàm thoại biết tuân thủ các quy tắc chỉ dẫn tác vụ. Các nghiên cứu hiện đại (như công trình LIMA - Less Is More for Alignment) đã chứng minh rằng một tập dữ liệu nhỏ gồm 1.000 mẫu được chọn lọc kỹ càng, đa dạng và được chuyên gia kiểm chứng luôn đem lại chất lượng căn chỉnh vượt trội so với 100.000 mẫu cào tự động chứa đầy lỗi định dạng và câu từ lặp lại. Định dạng dữ liệu phổ biến gồm có: kiểu Alpaca (`instruction`, `input`, `output`), kiểu ShareGPT (`conversations` đàm thoại đa lượt) hoặc chuẩn ChatML (`<|im_start|>system...<|im_end|>`). Cần lưu ý rằng mỗi họ mô hình sử dụng tokenizer chat gốc khác nhau: Llama-3 dùng các thẻ header (`<|start_header_id|>user<|end_header_id|>`), Mistral dùng `[INST] ... [/INST]`, còn Qwen dùng ChatML. Ngoài định dạng, yêu cầu kỹ thuật then chốt nhất trong instruction tuning là **Che Nhãn Loss Masking (Chỉ Tính Loss Trên Câu Trả Lời)**: trong quá trình tính hàm mất mát cross-entropy, tất cả các token thuộc system prompt và câu hỏi của user phải được gán nhãn mục tiêu là `-100` (giá trị `ignore_index` tiêu chuẩn của PyTorch). Nếu bỏ qua loss masking và tính loss trên toàn bộ chuỗi, mô hình sẽ lãng phí gradient để học vẹt cách diễn đạt của đề bài thay vì học năng lực tư duy giải quyết vấn đề.',
          },
          comparisonTable: {
            headers: [
              { en: 'Format Standard', vi: 'Chuẩn Định Dạng' },
              { en: 'Structure Type', vi: 'Cấu Trúc Dữ Liệu' },
              { en: 'Multi-Turn Support', vi: 'Hỗ Trợ Hội Thoại Đa Lượt' },
              { en: 'Primary Ecosystem', vi: 'Hệ Sinh Thái Sử Dụng' },
            ],
            rows: [
              {
                en: ['Alpaca Format', 'Flat keys: instruction, input, output', 'Poor (Primarily single-turn question-answer)', 'Early open-source research (Stanford Alpaca)'],
                vi: ['Chuẩn Alpaca', 'Khóa phẳng: instruction, input, output', 'Kém (Chủ yếu dành cho hỏi đáp 1 lượt)', 'Nghiên cứu mã nguồn mở đời đầu (Stanford Alpaca)'],
              },
              {
                en: ['ShareGPT Format', 'Array of { from: "human"|"gpt", value: string }', 'Excellent (Arbitrary length conversation threads)', 'FastChat, Axolotl, unsloth workflows'],
                vi: ['Chuẩn ShareGPT', 'Mảng { from: "human"|"gpt", value: string }', 'Xuất sắc (Luồng đàm thoại độ dài tùy ý)', 'Công cụ FastChat, Axolotl, unsloth'],
              },
              {
                en: ['ChatML / OpenAI JSONL', 'Array of { role: "system"|"user"|"assistant", content: string }', 'Native (Full system prompt and role separation)', 'HuggingFace apply_chat_template(), modern frontier LLMs'],
                vi: ['ChatML / OpenAI JSONL', 'Mảng { role: "system"|"user"|"assistant", content: string }', 'Gốc (Phân tách rõ ràng system, user và assistant)', 'Hàm apply_chat_template() của HuggingFace, mô hình hiện đại'],
              },
            ],
          },
          codeBlock: {
            language: 'python',
            filename: 'data/chatml_loss_masking.py',
            explanation: {
              en: 'Demonstrates formatting multi-turn conversations and applying response loss masking by assigning -100 to prompt tokens.',
              vi: 'Minh họa cách định dạng cuộc hội thoại đa lượt và áp dụng che nhãn loss masking bằng cách gán -100 cho các token thuộc prompt.',
            },
            code: `import torch
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-3-8B-Instruct")

# 1. Standard ChatML / Multi-turn Message Structure
conversation = [
    {"role": "system", "content": "You are an expert financial risk modeling engine."},
    {"role": "user", "content": "Explain liquidity risk in corporate bond markets."},
    {"role": "assistant", "content": "Liquidity risk occurs when an investor cannot rapidly sell a bond without incurring severe price concessions..."}
]

# 2. Tokenize prompt only (system + user) to determine prompt token length
prompt_messages = conversation[:2]
prompt_tokens = tokenizer.apply_chat_template(
    prompt_messages,
    add_generation_prompt=True,
    tokenize=True,
    return_tensors="pt"
)[0]

# 3. Tokenize complete conversation (system + user + assistant response)
full_tokens = tokenizer.apply_chat_template(
    conversation,
    add_generation_prompt=False,
    tokenize=True,
    return_tensors="pt"
)[0]

# 4. Construct labels tensor with strict response loss masking
labels = full_tokens.clone()

# Mask out all tokens belonging to the prompt by setting them to -100 (PyTorch ignore_index)
prompt_length = len(prompt_tokens)
labels[:prompt_length] = -100

print(f"Total tokens in sequence: {len(full_tokens)}")
print(f"Masked prompt tokens (-100): {prompt_length}")
print(f"Trainable response tokens: {len(full_tokens) - prompt_length}")
# Loss will be computed strictly on the assistant response tokens!`,
          },
          commonMistakes: [
            {
              mistake: {
                en: 'Training on full sequences without loss masking on user and system prompt tokens',
                vi: 'Huấn luyện trên toàn bộ chuỗi mà không dùng loss masking che token câu hỏi và system prompt',
              },
              why: {
                en: 'The model spends significant gradient capacity memorizing user query vocabulary and syntax rather than learning the required reasoning and generation logic.',
                vi: 'Mô hình tốn nhiều dung lượng gradient để học vẹt từ vựng và cú pháp đề bài thay vì học logic tư duy và cách trả lời câu hỏi.',
              },
              solution: {
                en: 'Set target labels to -100 for all system prompt and user input tokens, computing cross-entropy loss exclusively on assistant response tokens.',
                vi: 'Gán nhãn mục tiêu bằng -100 cho toàn bộ token của system prompt và user, chỉ tính loss cross-entropy trên token phản hồi của assistant.',
              },
              codeIncorrect: 'labels = input_ids.clone() # Computes loss on user prompt!',
              codeCorrect: 'labels = input_ids.clone()\nlabels[:prompt_length] = -100 # Ignores prompt tokens',
            },
            {
              mistake: {
                en: 'Hardcoding chat delimiters (e.g. ChatML) for a model family that uses a different native format (e.g. Llama-3 or Mistral)',
                vi: 'Code cứng các thẻ phân tách chat (như ChatML) cho mô hình sử dụng định dạng gốc khác (như Llama-3 hoặc Mistral)',
              },
              why: {
                en: 'Special control tokens are not recognized by the pre-trained embedding layers, corrupting model generation boundaries and leading to repetition loops.',
                vi: 'Các token điều khiển đặc biệt sẽ không được tầng embedding nhận diện, làm hỏng ranh giới sinh câu của mô hình và dẫn đến lặp từ vô tận.',
              },
              solution: {
                en: 'Always use tokenizer.apply_chat_template() to automatically render the model exact native delimiter formatting.',
                vi: 'Luôn sử dụng phương thức tokenizer.apply_chat_template() để tự động áp dụng đúng chuẩn định dạng gốc của từng mô hình.',
              },
              codeIncorrect: 'text = f"<|im_start|>user\\n{q}<|im_end|>\\n<|im_start|>assistant\\n{a}"',
              codeCorrect: 'text = tokenizer.apply_chat_template(messages, tokenize=False)',
            },
          ],
          practicalScenario: {
            en: 'A legal tech team fine-tuned an 8B parameter model on 50,000 web-scraped legal Q&A pairs without loss masking. The resulting model began echoing user questions verbatim and hallucinated court citations. After auditing their pipeline, they reduced the dataset to 2,500 attorney-validated contract analyses and enforced response loss masking with `labels[:prompt_len] = -100`. The fine-tuned model achieved 94% contract clause extraction accuracy, dropping prompt echoes to zero.',
            vi: 'Một nhóm kỹ sư pháp lý đã fine-tune mô hình 8B trên 50.000 cặp câu hỏi luật cào từ mạng mà không dùng loss masking. Kết quả là mô hình thường xuyên lặp lại y nguyên câu hỏi của người dùng và tự bịa trích dẫn án lệ. Sau khi rà soát, họ cắt giảm tập dữ liệu xuống còn 2.500 mẫu hợp đồng được luật sư kiểm chứng và áp dụng loss masking `labels[:prompt_len] = -100`. Mô hình mới đạt độ chính xác trích xuất điều khoản lên tới 94% và triệt tiêu hoàn toàn hiện tượng lặp lại đề bài.',
          },
          bestPractices: {
            en: [
              'Perform decontamination: verify that no benchmark evaluation test questions (e.g. MMLU, GSM8K) appear in your training data.',
              'Filter out examples with mismatched or noisy formatting before tokenization.',
              'Use tokenizer.apply_chat_template() rather than manual string concatenation to maintain compatibility across model families.',
              'Keep dataset size focused (1,000 - 5,000 samples) and invest engineering effort into example diversity and verification.',
            ],
            vi: [
              'Khử nhiễm dữ liệu (decontamination): đảm bảo không có câu hỏi thuộc bộ benchmark đánh giá (như MMLU, GSM8K) lọt vào tập train.',
              'Lọc sạch các mẫu có định dạng lỗi hoặc nội dung rác trước khi đưa vào tokenizer.',
              'Dùng tokenizer.apply_chat_template() thay vì nối chuỗi thủ công để duy trì tính tương thích giữa các họ mô hình khác nhau.',
              'Giữ quy mô tập dữ liệu tinh gọn (1.000 - 5.000 mẫu) và tập trung công sức vào việc đa dạng hóa và kiểm duyệt chất lượng từng mẫu.',
            ],
          },
          keyTakeaways: {
            en: [
              'Data curation quality decisively governs fine-tuning success: small, expert-verified sets outperform massive noisy datasets.',
              'Loss masking is non-negotiable: setting prompt labels to -100 ensures the model learns task generation rather than prompt memorization.',
              'Always leverage tokenizer chat templates to match model-specific native role delimiters.',
            ],
            vi: [
              'Chất lượng dữ liệu quyết định thành công của fine-tuning: tập dữ liệu nhỏ có kiểm duyệt luôn tốt hơn dữ liệu khổng lồ chứa rác.',
              'Loss masking là quy tắc bắt buộc: gán nhãn prompt bằng -100 giúp mô hình tập trung học tư duy thay vì học vẹt câu hỏi.',
              'Luôn tận dụng chat template của tokenizer để đảm bảo đúng cú pháp thẻ phân vai gốc của từng mô hình.',
            ],
          },
        },
      ],
    },
  ],
};
