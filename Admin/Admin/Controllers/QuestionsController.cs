using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Admin.Services;
using Admin.Models;
using Newtonsoft.Json;

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
            
            
        }
        [HttpGet]
        public List<Question> Get()
        {
            return _questionService.GetAllQuestions();
        }

        [HttpPost]
        public void PostQuestion([FromBody] dynamic question) 
        {
            if (!ModelState.IsValid)
            {
                
            }

            //if (question.questionType == "MMCQType")
            //{
            //    var questionAsJsonString = JsonConvert.SerializeObject(question);
            //    MMCQType mmcqType = JsonConvert.DeserializeObject<MMCQType>(questionAsJsonString);
            //    _questionService.AddQuestion(mmcqType);
            //}    
            if (question.questionType == "MCQType")
            {
                var questionAsJsonString = JsonConvert.SerializeObject(question);
                MCQType mcqType = JsonConvert.DeserializeObject<MCQType>(questionAsJsonString);
                _questionService.AddQuestion(mcqType);
            }

        }

        [HttpDelete("id/{id}")]
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