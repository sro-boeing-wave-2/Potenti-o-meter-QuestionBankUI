using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Admin.Services;
using Admin.Models;
namespace Admin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly IQuestionServices _questionService;
        public QuestionsController(IQuestionServices questionService)
        {
            _questionService = questionService;
            
            MCQType mcqType = new MCQType();
            mcqType.conceptTags = new string[] { "addition", "substraction" };
            mcqType.correctOption="4";
            mcqType.domain="maths";
            mcqType.difficultyLevel=10;
            Options o1 = new Options();
            o1.Option = "1";
             Options o2 = new Options();
            o1.Option = "4";
            mcqType.OptionList = new List<Options>();
            mcqType.OptionList.Add(o1);
            mcqType.OptionList.Add(o2);
            mcqType.questionText="2+2=?";
            
            MMCQType mmcqType= new MMCQType();
            mmcqType.conceptTags = new string[] { "addition" , "substraction" };
            correctOption c1 = new correctOption();
            c1.CorrectOption="2";
            correctOption c2 = new correctOption();
            c2.CorrectOption="4";
            mmcqType.correctOptionList = new List<correctOption>();
            mmcqType.correctOptionList.Add(c1);
            mmcqType.correctOptionList.Add(c2);
            mmcqType.difficultyLevel=9;
            mmcqType.domain="maths";
            mmcqType.questionText="even number";
            
           // Console.WriteLine("Adding Questions");
            //_questionService.AddQuestion(mmcqType);
            //_questionService.AddQuestion(mcqType);
            //var questions = _questionService.GetAllQuestions();
            //Console.WriteLine($"Questions {questions.Count}");
            //questions.ForEach(question => Console.WriteLine(question));

        }
        [HttpGet]
        public List<Question> Get()
        {
            return _questionService.GetAllQuestions();
        }

        //[HttpGet("domain")]
        //public List<Question> GetByDomain(string domainchoice)
        //{
        //    return _questionService.GetQuestionsByDomain(domainchoice);
        //}
        //[HttpGet("difficultylevel")]
        //public Task<List<Question>> GetByDifficultyLevel(int difficultylevel)
        //{
        //    return _questionService.GetQuestionsByDifficultyLevel(difficultylevel);
        //}
        [HttpPost]
        public IActionResult PostQuestion([FromBody] Question question)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _questionService.AddQuestion(question);
            return CreatedAtAction("GetAllQuestions", new { id = question.questionId }, question);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteQuestion([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var question = _questionService.DeleteQuestionById(id);
            if (question == false)
            {
                return NotFound();
            }

            return Ok(question);
        }
        [HttpDelete("{domain}")]
        public IActionResult DeleteQuestionId([FromRoute] string domain)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var question = _questionService.DeleteQuestionByDomain(domain);
            if (question == false)
            {
                return NotFound();
            }

            return Ok(question);
        }



    }
}