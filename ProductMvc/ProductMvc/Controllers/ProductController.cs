using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductMvc.DAL;
using ProductMvc.Models.DbEntities;

namespace ProductMvc.Controllers
{
    public class ProductController : Controller
    {
        protected readonly AppDbContext _dbContext;

        public ProductController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult GetProducts()
        {
            var products = _dbContext.Products.ToList();
            return Json(products);
        }

        [HttpPost]
        public IActionResult Insert(Product model)
        {
            if (ModelState.IsValid)
            {
                _dbContext.Products.Add(model);
                _dbContext.SaveChanges();
                return Json("Product is saved");
            }
            else
            {
                return BadRequest("Model validation failed");
            }
        }

        [HttpGet]
        public IActionResult GetProductById(int id)
        { 
                var product = _dbContext.Products.Find(id);
                return Json(product);
        }

        [HttpPost]
        public IActionResult Update(Product model)
        {
            if (ModelState.IsValid)
            {
                _dbContext.Products.Update(model);
                _dbContext.SaveChanges();
                return Json("Product is updated");
            }
            else
            {
                return BadRequest("Model validation failed");
            }
        }

        [HttpPost]
        public IActionResult Delete(Product model)
        {
            if (ModelState.IsValid)
            {
                _dbContext.Products.Remove(model);
                _dbContext.SaveChanges();
                return Json("Product is deleted");
            }
            else
            {
                return BadRequest("Model validation failed");
            }
        }
    }
}
